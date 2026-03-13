"""
auto_push.py
============
Vigila cambios en index.html y hace commit + push automatico.

Uso:
    python auto_push.py          # vigila cambios en index.html
    python auto_push.py --once   # ejecuta una sola vez (commit + push) y sale

Configuracion en .env (raiz del repo):
    GITHUB_TOKEN, GITHUB_USER, GITHUB_REPO, GITHUB_BRANCH, GITHUB_FILE
"""

import os
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

# ── Rutas ────────────────────────────────────────────────────────────────
REPO_DIR = Path(
    r"C:\Users\Quick\OneDrive\OneDrive - Quick Help SAS\INFORMES\LICITACIONES"
)
ENV_FILE = REPO_DIR / ".env"

# ── Intervalo de vigilancia (segundos) ───────────────────────────────────
WATCH_INTERVAL = 5


def load_env() -> dict[str, str]:
    """Lee variables del archivo .env."""
    env = {}
    if ENV_FILE.exists():
        for line in ENV_FILE.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                key, value = line.split("=", 1)
                env[key.strip()] = value.strip()
    return env


def setup() -> tuple[str, str, str, str, Path, str]:
    """Carga config y devuelve (token, user, repo, branch, index_path, public_url)."""
    env = load_env()
    token = env.get("GITHUB_TOKEN", "")
    user = env.get("GITHUB_USER", "")
    repo = env.get("GITHUB_REPO", "")
    branch = env.get("GITHUB_BRANCH", "main")
    file_name = env.get("GITHUB_FILE", "index.html")

    if not all([token, user, repo]):
        print("[ERROR] Falta configuracion en .env (GITHUB_TOKEN, GITHUB_USER, GITHUB_REPO)")
        sys.exit(1)

    index_path = REPO_DIR / "PrimerAnalisis" / "Artefactos" / file_name
    public_url = f"https://{user}.github.io/{repo}/"
    return token, user, repo, branch, index_path, public_url


def run(cmd: str, env_extra: dict | None = None) -> subprocess.CompletedProcess:
    """Ejecuta un comando shell en el directorio del repo."""
    safe_cmd = cmd
    if "https://" in cmd and "@" in cmd:
        safe_cmd = cmd.split("https://")[0] + "https://***@github.com/..."
    print(f"  $ {safe_cmd}")

    run_env = {**os.environ, **(env_extra or {})}
    result = subprocess.run(
        cmd, cwd=REPO_DIR, shell=True, text=True, capture_output=True, env=run_env
    )
    if result.stdout.strip():
        print(result.stdout.strip())
    if result.stderr.strip():
        print(result.stderr.strip())
    if result.returncode != 0:
        raise RuntimeError(f"Comando fallo ({result.returncode}): {safe_cmd}")
    return result


def configure_remote(token: str, user: str, repo: str) -> None:
    """Configura el remote 'origin' con autenticacion por token."""
    remote_url = f"https://{user}:{token}@github.com/{user}/{repo}.git"

    result = subprocess.run(
        "git remote get-url origin",
        cwd=REPO_DIR, shell=True, text=True, capture_output=True,
    )

    if result.returncode == 0:
        run(f'git remote set-url origin "{remote_url}"')
    else:
        run(f'git remote add origin "{remote_url}"')

    print(f"  [OK] Remote configurado: github.com/{user}/{repo}")


def has_changes() -> bool:
    """Verifica si hay cambios pendientes en el repo."""
    result = subprocess.run(
        "git status --porcelain",
        cwd=REPO_DIR, shell=True, text=True, capture_output=True,
    )
    return bool(result.stdout.strip())


def commit_and_push(branch: str) -> None:
    """Agrega todos los cambios, hace commit y push."""
    if not has_changes():
        print("  Sin cambios para commitear.")
        return

    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    run("git add -A")
    if not has_changes():
        print("  Sin cambios despues de git add (filtrados por .gitignore).")
        return

    run(f'git commit -m "auto: actualizacion {now}"')
    run(f"git push origin {branch}")
    print(f"  [OK] Push completado -- {now}")
    return True


def watch(branch: str, index_path: Path) -> None:
    """Vigila index.html y ejecuta commit+push cuando cambia."""
    if not index_path.exists():
        print(f"[ERROR] No se encontro: {index_path}")
        sys.exit(1)

    last_mtime = index_path.stat().st_mtime
    print(f"[WATCH] Vigilando: {index_path}")
    print(f"        Revisando cada {WATCH_INTERVAL}s -- Ctrl+C para detener.\n")

    try:
        while True:
            time.sleep(WATCH_INTERVAL)
            current_mtime = index_path.stat().st_mtime
            if current_mtime != last_mtime:
                print(f"\n[CAMBIO] Detectado en {index_path.name}")
                last_mtime = current_mtime
                time.sleep(2)
                try:
                    commit_and_push(branch)
                except RuntimeError as e:
                    print(f"  [WARN] Error: {e}")
    except KeyboardInterrupt:
        print("\n[STOP] Vigilancia detenida.")


if __name__ == "__main__":
    token, user, repo, branch, index_path, public_url = setup()
    configure_remote(token, user, repo)

    print(f"  [URL] GitHub Pages: {public_url}")
    print()

    if "--once" in sys.argv:
        print("[RUN] Ejecutando commit + push una vez...")
        try:
            commit_and_push(branch)
        except RuntimeError as e:
            print(f"[ERROR] {e}")
            sys.exit(1)
    else:
        watch(branch, index_path)
