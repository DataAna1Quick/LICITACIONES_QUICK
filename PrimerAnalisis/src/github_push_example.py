import subprocess
from pathlib import Path
from datetime import datetime


def run(cmd: str, cwd: Path | None = None) -> subprocess.CompletedProcess:
    """Ejecuta un comando en shell y lanza error si falla."""
    print(f"$ {cmd}")
    result = subprocess.run(
        cmd,
        cwd=cwd,
        shell=True,
        text=True,
        capture_output=True,
    )
    if result.stdout:
        print(result.stdout)
    if result.stderr:
        print(result.stderr)
    if result.returncode != 0:
        raise RuntimeError(f"Comando falló: {cmd}")
    return result


def git_push_example() -> None:
    # Ruta al repo local
    repo_dir = Path(
        r"C:\Users\Quick\OneDrive\OneDrive - Quick Help SAS\INFORMES\LICITACIONES"
    )

    # Archivo HTML que quieres versionar
    html_path = repo_dir / r"PrimerAnalisis\Artefactos\index.html"

    # Pequeña modificación para la prueba (añadir comentario con timestamp)
    now = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    with html_path.open("a", encoding="utf-8") as f:
        f.write(f"\n<!-- Actualizado desde script Python: {now} -->\n")

    # git add (solo ese archivo)
    run(f'git add "{html_path.relative_to(repo_dir)}"', cwd=repo_dir)

    # Ver si realmente hay cambios
    status = subprocess.run(
        "git status --porcelain",
        cwd=repo_dir,
        shell=True,
        text=True,
        capture_output=True,
    )
    if status.stdout.strip() == "":
        print("No hay cambios para commitear.")
        return

    # git commit
    commit_msg = f"Actualiza index.html desde script Python ({now})"
    run(f'git commit -m "{commit_msg}"', cwd=repo_dir)

    # git push a origin main
    run("git push origin main", cwd=repo_dir)
    print("✅ Push completado correctamente.")


if __name__ == "__main__":
    git_push_example()

