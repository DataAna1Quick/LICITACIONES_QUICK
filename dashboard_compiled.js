const {
  useState,
  useMemo
} = React;
const {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ComposedChart,
  Area,
  Line
} = Recharts;
const LOGO = "data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAA0AKEDASIAAhEBAxEB/8QAHAABAAIDAQEBAAAAAAAAAAAAAAUGAwQHAQII/8QANRAAAQMEAQMCBQIFAwUAAAAAAQIDBAAFBhEhBxIxE0EUIlFhcTJSCBVCgZEWI8EzYpKhsf/EABsBAQACAgMAAAAAAAAAAAAAAAABBgIEAwUH/8QAMxEAAQMCBQIDBQgDAAAAAAAAAQIDEQAhBAUSMVEGYUFxkRMiMqHwBxQzYrHB0fFSgeH/2gAMAwEAAhEDEQA/AOaUpUljlln3+6N2+3tFbiz8yv6UD3JP0r1DE4lrCtKeeUEpSJJOwFeTNNLeWG2xJNgBUbSux2LpLZptpjSZFxnh1xG1hBQE7+201BdQsPxXFYOhcbg/cHR/ssFaP/JXy8CqTgvtHyTHY4YDDFanCSICD4bmeBzxVgxHSmYYfD/eXQkIifiH1Pauc0rLFiyZbvpRY7r6/wBraCo/4Fey4kqI56cuM8wv9riCk/8Aur5ImKrkGJrDSlZI7D8hz047Ljq9b7UJKjr8ClN6x0r1aVIWULSUqB0QRoivKVFKUrIwy9Ic9Nhpx1et9qElR/wKVO9Y6V64hba1IcSpC0nRSoaINeUqKUr6abcedS00hTjizpKUjZJ+gFfUlh+K+piSy4y6g6UhaSlQ/INJ8KmDE1jpX2wy8+4G2GnHVnwlCSo/4FZUwZqmnnUxHy2wdPKDZ02f+76f3oSBQAnatelKUqKUpSlKkcds0+/XRu329ouOrPJ9kD3JPsK7j08xJFpsx+Gusxl5big8ppDWlFJI/qQTrjxuqV0Tyq2Wp5y0TmGo65K9ty/3H2So/T6VebSiYytapV1msQn5DnoOMemEtnvPyq2knn2Vv31x7+AfaXnGbYjEO5coBppOkpkavabyRYgxFk7iOYFemdJYHBNNIxQOtZkGDGjbuPXvWtd8wiYphkNJWJFwca0w0SNnk/MrXgVxRTlyyXImg88X5099LSVLPlSlAAfYc1PZ5i1zgNM3tTrkyHJH/UPJaP7T9vpVZtE522XaHcmAkvRH0PoCvHclQUN/4q+9BZBleBwrmMwSw444Val8GfgjwAO48d+IrnUeZ4vEvpYxCShCAIHaPi7k/Lbmv0dm2Q2jodZbdjuL2mJLvT7IdflyU7+xUoAgkk70NgACqBlvWH/WOGyrRf8AFLa/d3FARpjIUkND9wGyruHtzo75Hsb71KxWN1ntNuy7C50Zc5pj0pER5favzsJP0UCT9jvzVMY6T3DBYkLMsqulujG3z2Hzb+8KU+2hwFSUq8FWhwOd/UV3mEOE0BTv40331T/HypjBjCspZ/Bi0Rp0/wA/Oslj6A3J61sSshyW3WKRJSCxFdR3rJPsrak6P2G6nOiWDXjCOtyrZemmlpctjy2Hm+W3U9yORv8A+VJ9bOnuR9Qcit2R4rOjT7Y9HQls/EBKWffuGzzve+OeKu7F5tkLqRiWKvXFqTdYdqkNPrCt/OUtaTv6n01HXngVwPY551kgrCtQVIA+GB9b1ss4Bhp4EIKdKkwon4pP0bV+ck4dc836u3ix2pTTa/innHHHDpLaAvlR1+QNfet7OOkzePMQ3oeYWm6fES0RFNoHY4hxR1+kFWwPfxVxs2KdQsc643WXYmbcqS4y7LDch4dkiOtwgJ45BJT/AG1zVtzbH7LIw9zLMoxaHi14hTW3kLYkJX6xC0nZKQO7fPBGxritteYLQ62ELGkgWEEyefH0rSby1C2nCtB1gm5kCBx4etcKznpxccTzC141KuEWQ/cQ2W3WgoJR3uFA3sb8jddL6S4NLwTrtFs9xlxpjjtrcfCmkntAJ1rkeeKtfVfBLzlXUXF8qtTkRVpitMqkPreCQhKHC53fcEH2qwXS0zEfxAWe+FKDCetLsdCgobK0nuPH00RzWs9manmAgqElKp862mcrSy+VhJgLTHl41zXLOhdyv2WXqe3kloizJct6RHgrJK+wrJBURyOPoDVBw7pDkV9yO6Wma9HtCLTr42RI5SnfjtA/VwCd7A1711IdKcxX1yGVpubK7WLl8WZXr/OGwvZZ7fPgdn0qY/meUXDqVkl4wePar1a20MQ5sSQ8E+utIOyhXtoHWzsH6HXGaMe8hGlDgV7oM7aTIEf3WC8uYWvW42U+8REzqEEz/VcnODysJ6l4mmy5JZrw9NmIMVztJSghQG3Egn5ST7HfB8Vs59heX5p1xuNnWLcq4ek07IejpWmOy36adE72fBA+5rpGXYvj9vu+C5Kuyxsavbt8jtOw2XkqQpJJKvGhwQD3ADzo+Rqwx3Grf1myu2S5CIknIbZFXbXCofN6aFtq/Cu47A9+2sTmK7OpuoJNyB/kOLQBe3FZjLUXaVZJULAnbSebgk2vzVT6SdIpOI9QYt2byC2Xdlhp1qU218q2VKSQNp2djf4P2qLcTkycf6rG1uWhFrF4mCQmQ0sveeewjjxrW/BqS6KdMMtw/qC/eL7cGGohStodsjuMxSt643/fnmp+3Y1dHLP1OsKUs/H3K4PSozfqDlt4bbJPtvR81wO4ge2KlOBdk3j837VzM4Y+xSlLZRdVp/L+9cT6d9HLrlFjTf7jdYlhtLh/2n5I2pz22E7A1v3JFR/U/pbecHjM3FUqPdLS+rtbmR/Gz4Chzrf5I+9dYyOxzepvRTF4+HyWFPWxptmXCLoRpaGwgg7+hBI35BrTzqIvBv4cf9JZFMafvEx5JYYSvuLI9RKyB9gEnnxtVdg3mDynh7wkqjRFwOZ378V1zmXMJZV7pgJ1a5sTxG3bmvzrSlKsNVug4OxXV+k+bxvhk4zfQgsr2lh5fg7/AKVf8GuUUHB2K6DqTpzCdQYI4TE28UqG6VDYj6vXZ5Tmr2WYgPNeRHgRwa/UGPQ4snEo0J9lDsdbPYUK5BTXFepmDSMalqlwwt61uq+RXktH9qv+DUDFynI4sdEePfLg002O1CEPqASPoBuvJeT5FLjrjSr1PeZcGloceUpKh9waoPTHQ+e9P5m5iWsShTTiiVIOq4J32soc/wCjarLm/UWW5ng0tLZUFpEBVrf8rPj7F0iWx++Qrwq1paX6aFIdUhbq+0q7R2/Ye9Td5xfJLhckNXa+JlSE+qJCpD61/DqaYLykqJ8/Ik8jY3VTg3a5wYkiJDnyY8eSntfabcIS4Na5HvwSKyv3+9voZQ9dpriWGlNNBTyj2IUgoUkc+CklJ+3FeqKbcKtSYqoodaCNKgatOKsX6BlK8YYymbbYzkZx8uRX1pbWkR1OpOh7EAe3ua0Y+KXx5LVyi3BtyaosukJdUHUJdX2tuFX3JHvsbqvt3a6Nz2Z6LhJEphAQ096h70JA0AD9Nca+lZF329LgtQVXWYYrKw4216yu1ChyCBvgjZ19N1BacBlJF4m3rWQeaIhQNpi/lFXS527IHptuui8ykSJDcJx5ye4+4fh0IfLQSk/q/URx9Sai7ojI7xOu8DIr5PmP2pla0pdkKdSVBQGh3HxzUQ7lmTuymZTl/uS32UqS04ZCipAVruAO/B0OPtWg1crg1JfktzZCXpCVJeWHD3OBX6go++6hDDg3ifD18qleIbO0wd79vOrLkDOUWKyGAvIn3YCXzFkRWZK+xp0DZQUnQP5HHFSFws2YRWktryZ1xdv9ZtTSZTm4ym2i4tA9vCdccbqm3O8XW5tMtXG4ypaGBppLzpUEfjf4H+KkDmGRmFGjG7SiYrvqMPF1XqN/J2doO+BrjVQWXIERN5tUh5qTMxaL1ZIdkzVdtuDaclWxGCUuONOTlIS+pbIe1onRPaoefeo/DbZdjbodysF7kQbpLufwDaGnVN72gHu7h+eag3slyF74n1b1cHPikBt/ufUfVSBrSueRrj8VqRLncYjAYizpDDQeS+EtuFIDif0rGvCh9akMuaSDF+361Bfa1Aibd/0qxX23ZBOzOJarjff5jMfUgMylyS6B3eDvZI1UlNxfKrtKt0heQJuTqltsNOrkrJYSttTrZ2rwkpSo8eNGqZIu1zkXIXN+fJcmpIKX1OErBHjR88V9s3m7s9no3OW32KbUnteUNFtJSgjn+kKUB9ATUlpyBpIsOKgPNSdQNzzVuuNsy2VKWiVlK5bsKTGjxSZq3O5x5JU2EHZ1wk78arYl2/Mbfenpj2ZrbcEYKenInLUQnvKAhXaSr9Xt9DuqPJu90kuuOyLjKcW46h5alOklS0AhKvyASAfbdbIybIRcP5h/O5/xfp+l63rq7uze+3e/G+fzWPsHO3pWQxDW9/WrDZLHk9ot0G9W3IEWs3BaEo9OaWl9i1lAWrR/TsHf0FQOZt3VnIJDF4nvT5SdEvuLUvvBAIIKvI5rXRfb0iKxFRdZqWGHPVZbDyu1te99wG+Dsk/mta4zplxlrlz5T0qQvXc46sqUdDQ5P2rkbbWFlSo/ftXE462WwlM+tu9a9KUrYrWpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUpSlKUr/2Q==";
const RAW = {
  "by_ms": [{
    "total": 1495,
    "efectivos": 1457,
    "no_efectivos": 38,
    "v1_total": 1490,
    "v1_efect": 1456,
    "v2_total": 5,
    "v2_efect": 1,
    "t_prom": 12.75,
    "mes": "ENERO",
    "semana": "SEMANA 1",
    "mes_num": 1,
    "semana_num": 1,
    "label": "ENE S1"
  }, {
    "total": 4739,
    "efectivos": 4504,
    "no_efectivos": 235,
    "v1_total": 4617,
    "v1_efect": 4501,
    "v2_total": 122,
    "v2_efect": 3,
    "t_prom": 11.72,
    "mes": "ENERO",
    "semana": "SEMANA 2",
    "mes_num": 1,
    "semana_num": 2,
    "label": "ENE S2"
  }, {
    "total": 4224,
    "efectivos": 4096,
    "no_efectivos": 128,
    "v1_total": 4163,
    "v1_efect": 4088,
    "v2_total": 61,
    "v2_efect": 8,
    "t_prom": 11.08,
    "mes": "ENERO",
    "semana": "SEMANA 3",
    "mes_num": 1,
    "semana_num": 3,
    "label": "ENE S3"
  }, {
    "total": 4594,
    "efectivos": 4407,
    "no_efectivos": 187,
    "v1_total": 4542,
    "v1_efect": 4402,
    "v2_total": 52,
    "v2_efect": 5,
    "t_prom": 12.71,
    "mes": "ENERO",
    "semana": "SEMANA 4",
    "mes_num": 1,
    "semana_num": 4,
    "label": "ENE S4"
  }, {
    "total": 4263,
    "efectivos": 4102,
    "no_efectivos": 161,
    "v1_total": 4234,
    "v1_efect": 4098,
    "v2_total": 29,
    "v2_efect": 4,
    "t_prom": 13.57,
    "mes": "ENERO",
    "semana": "SEMANA 5",
    "mes_num": 1,
    "semana_num": 5,
    "label": "ENE S5"
  }, {
    "total": 3075,
    "efectivos": 2922,
    "no_efectivos": 153,
    "v1_total": 3044,
    "v1_efect": 2921,
    "v2_total": 31,
    "v2_efect": 1,
    "t_prom": 15.12,
    "mes": "FEBRERO",
    "semana": "SEMANA 1",
    "mes_num": 2,
    "semana_num": 1,
    "label": "FEB S1"
  }, {
    "total": 3513,
    "efectivos": 3383,
    "no_efectivos": 130,
    "v1_total": 3513,
    "v1_efect": 3383,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 14.8,
    "mes": "FEBRERO",
    "semana": "SEMANA 2",
    "mes_num": 2,
    "semana_num": 2,
    "label": "FEB S2"
  }, {
    "total": 4484,
    "efectivos": 4272,
    "no_efectivos": 212,
    "v1_total": 4480,
    "v1_efect": 4269,
    "v2_total": 4,
    "v2_efect": 3,
    "t_prom": 15.79,
    "mes": "FEBRERO",
    "semana": "SEMANA 3",
    "mes_num": 2,
    "semana_num": 3,
    "label": "FEB S3"
  }, {
    "total": 4458,
    "efectivos": 4236,
    "no_efectivos": 222,
    "v1_total": 4458,
    "v1_efect": 4236,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 17.67,
    "mes": "FEBRERO",
    "semana": "SEMANA 4",
    "mes_num": 2,
    "semana_num": 4,
    "label": "FEB S4"
  }, {
    "total": 4289,
    "efectivos": 4116,
    "no_efectivos": 173,
    "v1_total": 4289,
    "v1_efect": 4116,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 15.2,
    "mes": "MARZO",
    "semana": "SEMANA 1",
    "mes_num": 3,
    "semana_num": 1,
    "label": "MAR S1"
  }, {
    "total": 4326,
    "efectivos": 4150,
    "no_efectivos": 176,
    "v1_total": 4326,
    "v1_efect": 4150,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 15.51,
    "mes": "MARZO",
    "semana": "SEMANA 2",
    "mes_num": 3,
    "semana_num": 2,
    "label": "MAR S2"
  }],
  "by_dept": [{
    "total": 12532,
    "efectivos": 12243,
    "no_efectivos": 289,
    "v1_total": 12442,
    "v1_efect": 12227,
    "v2_total": 90,
    "v2_efect": 16,
    "t_prom": 20.03,
    "departamento": "ANTIOQUIA"
  }, {
    "total": 7732,
    "efectivos": 7372,
    "no_efectivos": 360,
    "v1_total": 7683,
    "v1_efect": 7370,
    "v2_total": 49,
    "v2_efect": 2,
    "t_prom": 12.63,
    "departamento": "BOYACA"
  }, {
    "total": 7338,
    "efectivos": 6886,
    "no_efectivos": 452,
    "v1_total": 7314,
    "v1_efect": 6884,
    "v2_total": 24,
    "v2_efect": 2,
    "t_prom": 10.73,
    "departamento": "BOGOTA"
  }, {
    "total": 6942,
    "efectivos": 6540,
    "no_efectivos": 402,
    "v1_total": 6822,
    "v1_efect": 6535,
    "v2_total": 120,
    "v2_efect": 5,
    "t_prom": 14.32,
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 3410,
    "efectivos": 3263,
    "no_efectivos": 147,
    "v1_total": 3410,
    "v1_efect": 3263,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 14.15,
    "departamento": "BOLIVAR"
  }, {
    "total": 2128,
    "efectivos": 2031,
    "no_efectivos": 97,
    "v1_total": 2111,
    "v1_efect": 2031,
    "v2_total": 17,
    "v2_efect": 0,
    "t_prom": 12.61,
    "departamento": "VALLE DEL CAUCA"
  }, {
    "total": 637,
    "efectivos": 613,
    "no_efectivos": 24,
    "v1_total": 637,
    "v1_efect": 613,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 19.18,
    "departamento": "QUINDIO"
  }, {
    "total": 627,
    "efectivos": 620,
    "no_efectivos": 7,
    "v1_total": 627,
    "v1_efect": 620,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 0.95,
    "departamento": "META"
  }, {
    "total": 571,
    "efectivos": 559,
    "no_efectivos": 12,
    "v1_total": 568,
    "v1_efect": 559,
    "v2_total": 3,
    "v2_efect": 0,
    "t_prom": 7.64,
    "departamento": "RISARALDA"
  }, {
    "total": 471,
    "efectivos": 471,
    "no_efectivos": 0,
    "v1_total": 471,
    "v1_efect": 471,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 0.41,
    "departamento": "MAGDALENA"
  }, {
    "total": 394,
    "efectivos": 387,
    "no_efectivos": 7,
    "v1_total": 394,
    "v1_efect": 387,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 3.45,
    "departamento": "ATLANTICO"
  }, {
    "total": 393,
    "efectivos": 376,
    "no_efectivos": 17,
    "v1_total": 392,
    "v1_efect": 376,
    "v2_total": 1,
    "v2_efect": 0,
    "t_prom": 17.28,
    "departamento": "TOLIMA"
  }, {
    "total": 197,
    "efectivos": 196,
    "no_efectivos": 1,
    "v1_total": 197,
    "v1_efect": 196,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 4.28,
    "departamento": "SANTANDER"
  }, {
    "total": 88,
    "efectivos": 88,
    "no_efectivos": 0,
    "v1_total": 88,
    "v1_efect": 88,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 0.57,
    "departamento": "CASANARE"
  }],
  "by_ciudad": [{
    "total": 9117,
    "efectivos": 8911,
    "no_efectivos": 206,
    "v1_total": 9040,
    "v1_efect": 8897,
    "v2_total": 77,
    "v2_efect": 14,
    "t_prom": 22.01,
    "ciudad": "MEDELLIN",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 7338,
    "efectivos": 6886,
    "no_efectivos": 452,
    "v1_total": 7314,
    "v1_efect": 6884,
    "v2_total": 24,
    "v2_efect": 2,
    "t_prom": 10.73,
    "ciudad": "BOGOTA",
    "departamento": "BOGOTA"
  }, {
    "total": 3410,
    "efectivos": 3263,
    "no_efectivos": 147,
    "v1_total": 3410,
    "v1_efect": 3263,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 14.15,
    "ciudad": "CARTAGENA",
    "departamento": "BOLIVAR"
  }, {
    "total": 3351,
    "efectivos": 3111,
    "no_efectivos": 240,
    "v1_total": 3333,
    "v1_efect": 3109,
    "v2_total": 18,
    "v2_efect": 2,
    "t_prom": 22.62,
    "ciudad": "TUNJA",
    "departamento": "BOYACA"
  }, {
    "total": 1664,
    "efectivos": 1524,
    "no_efectivos": 140,
    "v1_total": 1602,
    "v1_efect": 1523,
    "v2_total": 62,
    "v2_efect": 1,
    "t_prom": 29.2,
    "ciudad": "ZIPAQUIRA",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 1485,
    "efectivos": 1415,
    "no_efectivos": 70,
    "v1_total": 1469,
    "v1_efect": 1415,
    "v2_total": 16,
    "v2_efect": 0,
    "t_prom": 5.78,
    "ciudad": "DUITAMA",
    "departamento": "BOYACA"
  }, {
    "total": 1408,
    "efectivos": 1267,
    "no_efectivos": 141,
    "v1_total": 1394,
    "v1_efect": 1263,
    "v2_total": 14,
    "v2_efect": 4,
    "t_prom": 18.24,
    "ciudad": "CHIA",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 1324,
    "efectivos": 1277,
    "no_efectivos": 47,
    "v1_total": 1309,
    "v1_efect": 1277,
    "v2_total": 15,
    "v2_efect": 0,
    "t_prom": 7.38,
    "ciudad": "SOGAMOSO",
    "departamento": "BOYACA"
  }, {
    "total": 1114,
    "efectivos": 1108,
    "no_efectivos": 6,
    "v1_total": 1112,
    "v1_efect": 1107,
    "v2_total": 2,
    "v2_efect": 1,
    "t_prom": 9.06,
    "ciudad": "RIONEGRO",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 1062,
    "efectivos": 1024,
    "no_efectivos": 38,
    "v1_total": 1059,
    "v1_efect": 1024,
    "v2_total": 3,
    "v2_efect": 0,
    "t_prom": 22.74,
    "ciudad": "BUGA",
    "departamento": "VALLE DEL CAUCA"
  }, {
    "total": 987,
    "efectivos": 954,
    "no_efectivos": 33,
    "v1_total": 981,
    "v1_efect": 953,
    "v2_total": 6,
    "v2_efect": 1,
    "t_prom": 24.31,
    "ciudad": "APARTADO",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 927,
    "efectivos": 870,
    "no_efectivos": 57,
    "v1_total": 888,
    "v1_efect": 870,
    "v2_total": 39,
    "v2_efect": 0,
    "t_prom": 16.18,
    "ciudad": "FUNZA",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 884,
    "efectivos": 883,
    "no_efectivos": 1,
    "v1_total": 884,
    "v1_efect": 883,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 1.43,
    "ciudad": "PAIPA",
    "departamento": "BOYACA"
  }, {
    "total": 832,
    "efectivos": 803,
    "no_efectivos": 29,
    "v1_total": 828,
    "v1_efect": 803,
    "v2_total": 4,
    "v2_efect": 0,
    "t_prom": 3.17,
    "ciudad": "CALI",
    "departamento": "VALLE DEL CAUCA"
  }, {
    "total": 689,
    "efectivos": 683,
    "no_efectivos": 6,
    "v1_total": 689,
    "v1_efect": 683,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 1.44,
    "ciudad": "GIRARDOT",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 637,
    "efectivos": 613,
    "no_efectivos": 24,
    "v1_total": 637,
    "v1_efect": 613,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 19.18,
    "ciudad": "MANIZALES",
    "departamento": "QUINDIO"
  }, {
    "total": 590,
    "efectivos": 583,
    "no_efectivos": 7,
    "v1_total": 590,
    "v1_efect": 583,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 0.86,
    "ciudad": "VILLAVICENCIO",
    "departamento": "META"
  }, {
    "total": 471,
    "efectivos": 471,
    "no_efectivos": 0,
    "v1_total": 471,
    "v1_efect": 471,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 0.41,
    "ciudad": "SANTA MARTHA",
    "departamento": "MAGDALENA"
  }, {
    "total": 462,
    "efectivos": 429,
    "no_efectivos": 33,
    "v1_total": 459,
    "v1_efect": 429,
    "v2_total": 3,
    "v2_efect": 0,
    "t_prom": 4.84,
    "ciudad": "CAJICA",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 458,
    "efectivos": 453,
    "no_efectivos": 5,
    "v1_total": 456,
    "v1_efect": 453,
    "v2_total": 2,
    "v2_efect": 0,
    "t_prom": 6.41,
    "ciudad": "MADRID",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 416,
    "efectivos": 406,
    "no_efectivos": 10,
    "v1_total": 416,
    "v1_efect": 406,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 3.79,
    "ciudad": "MOSQUERA",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 394,
    "efectivos": 387,
    "no_efectivos": 7,
    "v1_total": 394,
    "v1_efect": 387,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 3.45,
    "ciudad": "BARRANQUILLA",
    "departamento": "ATLANTICO"
  }, {
    "total": 393,
    "efectivos": 376,
    "no_efectivos": 17,
    "v1_total": 392,
    "v1_efect": 376,
    "v2_total": 1,
    "v2_efect": 0,
    "t_prom": 17.28,
    "ciudad": "IBAGUE",
    "departamento": "TOLIMA"
  }, {
    "total": 387,
    "efectivos": 387,
    "no_efectivos": 0,
    "v1_total": 387,
    "v1_efect": 387,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 6.99,
    "ciudad": "CHIQUINQUIRA",
    "departamento": "BOYACA"
  }, {
    "total": 353,
    "efectivos": 346,
    "no_efectivos": 7,
    "v1_total": 352,
    "v1_efect": 346,
    "v2_total": 1,
    "v2_efect": 0,
    "t_prom": 31.46,
    "ciudad": "ENVIGADO",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 331,
    "efectivos": 330,
    "no_efectivos": 1,
    "v1_total": 331,
    "v1_efect": 330,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 5.71,
    "ciudad": "MANIZALES",
    "departamento": "RISARALDA"
  }, {
    "total": 301,
    "efectivos": 299,
    "no_efectivos": 2,
    "v1_total": 301,
    "v1_efect": 299,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 1.05,
    "ciudad": "VILLA DE LEIVA",
    "departamento": "BOYACA"
  }, {
    "total": 274,
    "efectivos": 272,
    "no_efectivos": 2,
    "v1_total": 274,
    "v1_efect": 272,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 2.75,
    "ciudad": "FACATATIVA",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 249,
    "efectivos": 244,
    "no_efectivos": 5,
    "v1_total": 249,
    "v1_efect": 244,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 7.2,
    "ciudad": "COTA",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 240,
    "efectivos": 229,
    "no_efectivos": 11,
    "v1_total": 237,
    "v1_efect": 229,
    "v2_total": 3,
    "v2_efect": 0,
    "t_prom": 10.42,
    "ciudad": "PEREIRA",
    "departamento": "RISARALDA"
  }, {
    "total": 234,
    "efectivos": 204,
    "no_efectivos": 30,
    "v1_total": 224,
    "v1_efect": 204,
    "v2_total": 10,
    "v2_efect": 0,
    "t_prom": 3.71,
    "ciudad": "PALMIRA",
    "departamento": "VALLE DEL CAUCA"
  }, {
    "total": 209,
    "efectivos": 209,
    "no_efectivos": 0,
    "v1_total": 209,
    "v1_efect": 209,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 15.49,
    "ciudad": "YARUMAL",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 197,
    "efectivos": 196,
    "no_efectivos": 1,
    "v1_total": 197,
    "v1_efect": 196,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 4.28,
    "ciudad": "BUCARAMANGA",
    "departamento": "SANTANDER"
  }, {
    "total": 167,
    "efectivos": 140,
    "no_efectivos": 27,
    "v1_total": 167,
    "v1_efect": 140,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 5.68,
    "ciudad": "ITAGUI",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 160,
    "efectivos": 156,
    "no_efectivos": 4,
    "v1_total": 160,
    "v1_efect": 156,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 10.89,
    "ciudad": "BELLO",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 145,
    "efectivos": 143,
    "no_efectivos": 2,
    "v1_total": 145,
    "v1_efect": 143,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 0.04,
    "ciudad": "VILLETA",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 140,
    "efectivos": 138,
    "no_efectivos": 2,
    "v1_total": 140,
    "v1_efect": 138,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 3.12,
    "ciudad": "LA UNION",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 139,
    "efectivos": 138,
    "no_efectivos": 1,
    "v1_total": 139,
    "v1_efect": 138,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 8.71,
    "ciudad": "FUSAGASUGA",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 111,
    "efectivos": 111,
    "no_efectivos": 0,
    "v1_total": 111,
    "v1_efect": 111,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 0.55,
    "ciudad": "ANAPOIMA",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 88,
    "efectivos": 88,
    "no_efectivos": 0,
    "v1_total": 88,
    "v1_efect": 88,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 0.57,
    "ciudad": "YOPAL",
    "departamento": "CASANARE"
  }, {
    "total": 83,
    "efectivos": 82,
    "no_efectivos": 1,
    "v1_total": 82,
    "v1_efect": 82,
    "v2_total": 1,
    "v2_efect": 0,
    "t_prom": 8.14,
    "ciudad": "SANTA FE ANTIOQUIA",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 70,
    "efectivos": 70,
    "no_efectivos": 0,
    "v1_total": 70,
    "v1_efect": 70,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 3.63,
    "ciudad": "EL RETIRO",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 37,
    "efectivos": 37,
    "no_efectivos": 0,
    "v1_total": 37,
    "v1_efect": 37,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 2.51,
    "ciudad": "ACACIAS",
    "departamento": "META"
  }, {
    "total": 32,
    "efectivos": 29,
    "no_efectivos": 3,
    "v1_total": 29,
    "v1_efect": 29,
    "v2_total": 3,
    "v2_efect": 0,
    "t_prom": 8.7,
    "ciudad": "MARINILLA",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 30,
    "efectivos": 30,
    "no_efectivos": 0,
    "v1_total": 30,
    "v1_efect": 30,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 14.41,
    "ciudad": "SANTA ROSA DE OSOS",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 18,
    "efectivos": 18,
    "no_efectivos": 0,
    "v1_total": 18,
    "v1_efect": 18,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 7.79,
    "ciudad": "CARMEN DE VIBORAL",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 18,
    "efectivos": 18,
    "no_efectivos": 0,
    "v1_total": 18,
    "v1_efect": 18,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 8.0,
    "ciudad": "GUARNE",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 17,
    "efectivos": 17,
    "no_efectivos": 0,
    "v1_total": 17,
    "v1_efect": 17,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 32.13,
    "ciudad": "GIRARDOTA",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 16,
    "efectivos": 16,
    "no_efectivos": 0,
    "v1_total": 16,
    "v1_efect": 16,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 24.83,
    "ciudad": "DON MATIAS",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 1,
    "efectivos": 1,
    "no_efectivos": 0,
    "v1_total": 1,
    "v1_efect": 1,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 2.92,
    "ciudad": "LA CEJA",
    "departamento": "ANTIOQUIA"
  }],
  "by_ts": [{
    "total": 16276,
    "efectivos": 15279,
    "no_efectivos": 997,
    "v1_total": 16034,
    "v1_efect": 15260,
    "v2_total": 242,
    "v2_efect": 19,
    "t_prom": 24.64,
    "tipo_servicio": "PENDIENTE"
  }, {
    "total": 8800,
    "efectivos": 8678,
    "no_efectivos": 122,
    "v1_total": 8781,
    "v1_efect": 8678,
    "v2_total": 19,
    "v2_efect": 0,
    "t_prom": 2.32,
    "tipo_servicio": "COMERCIAL"
  }, {
    "total": 5933,
    "efectivos": 5656,
    "no_efectivos": 277,
    "v1_total": 5933,
    "v1_efect": 5656,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 8.18,
    "tipo_servicio": "TRANSFERENCIA"
  }, {
    "total": 2946,
    "efectivos": 2865,
    "no_efectivos": 81,
    "v1_total": 2941,
    "v1_efect": 2865,
    "v2_total": 5,
    "v2_efect": 0,
    "t_prom": 7.22,
    "tipo_servicio": "CONVENIOS COMERCIALES"
  }, {
    "total": 1814,
    "efectivos": 1772,
    "no_efectivos": 42,
    "v1_total": 1808,
    "v1_efect": 1769,
    "v2_total": 6,
    "v2_efect": 3,
    "t_prom": 19.66,
    "tipo_servicio": "POLIZA"
  }, {
    "total": 1761,
    "efectivos": 1704,
    "no_efectivos": 57,
    "v1_total": 1761,
    "v1_efect": 1704,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 3.81,
    "tipo_servicio": "SALUD EN CASA"
  }, {
    "total": 1662,
    "efectivos": 1642,
    "no_efectivos": 20,
    "v1_total": 1661,
    "v1_efect": 1642,
    "v2_total": 1,
    "v2_efect": 0,
    "t_prom": 7.98,
    "tipo_servicio": "AVIANCA"
  }, {
    "total": 1333,
    "efectivos": 1261,
    "no_efectivos": 72,
    "v1_total": 1328,
    "v1_efect": 1260,
    "v2_total": 5,
    "v2_efect": 1,
    "t_prom": 29.09,
    "tipo_servicio": "LANDING"
  }, {
    "total": 864,
    "efectivos": 802,
    "no_efectivos": 62,
    "v1_total": 851,
    "v1_efect": 802,
    "v2_total": 13,
    "v2_efect": 0,
    "t_prom": 21.6,
    "tipo_servicio": "APP"
  }, {
    "total": 726,
    "efectivos": 713,
    "no_efectivos": 13,
    "v1_total": 719,
    "v1_efect": 711,
    "v2_total": 7,
    "v2_efect": 2,
    "t_prom": 26.16,
    "tipo_servicio": "PRE AGENDA"
  }, {
    "total": 515,
    "efectivos": 480,
    "no_efectivos": 35,
    "v1_total": 512,
    "v1_efect": 480,
    "v2_total": 3,
    "v2_efect": 0,
    "t_prom": 17.32,
    "tipo_servicio": "UNISALUD"
  }, {
    "total": 476,
    "efectivos": 449,
    "no_efectivos": 27,
    "v1_total": 475,
    "v1_efect": 449,
    "v2_total": 1,
    "v2_efect": 0,
    "t_prom": 18.85,
    "tipo_servicio": "SENA"
  }, {
    "total": 179,
    "efectivos": 177,
    "no_efectivos": 2,
    "v1_total": 178,
    "v1_efect": 177,
    "v2_total": 1,
    "v2_efect": 0,
    "t_prom": 20.79,
    "tipo_servicio": "DESACATO"
  }, {
    "total": 91,
    "efectivos": 90,
    "no_efectivos": 1,
    "v1_total": 90,
    "v1_efect": 90,
    "v2_total": 1,
    "v2_efect": 0,
    "t_prom": 2.58,
    "tipo_servicio": "PACIENTE HOSPITALIZADO"
  }, {
    "total": 55,
    "efectivos": 54,
    "no_efectivos": 1,
    "v1_total": 55,
    "v1_efect": 54,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 10.34,
    "tipo_servicio": "TODAS"
  }, {
    "total": 29,
    "efectivos": 23,
    "no_efectivos": 6,
    "v1_total": 29,
    "v1_efect": 23,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 11.99,
    "tipo_servicio": "WEB"
  }],
  "by_tsg": [{
    "total": 28109,
    "efectivos": 26787,
    "no_efectivos": 1322,
    "v1_total": 27837,
    "v1_efect": 26766,
    "v2_total": 272,
    "v2_efect": 21,
    "t_prom": 19.24,
    "tipo_servicio_grupo": "Institucional "
  }, {
    "total": 14216,
    "efectivos": 13903,
    "no_efectivos": 313,
    "v1_total": 14185,
    "v1_efect": 13899,
    "v2_total": 31,
    "v2_efect": 4,
    "t_prom": 5.49,
    "tipo_servicio_grupo": "Comercial"
  }, {
    "total": 1135,
    "efectivos": 955,
    "no_efectivos": 180,
    "v1_total": 1134,
    "v1_efect": 955,
    "v2_total": 1,
    "v2_efect": 0,
    "t_prom": 11.41,
    "tipo_servicio_grupo": "IPS"
  }],
  "by_esp": [{
    "total": 1738,
    "efectivos": 1674,
    "no_efectivos": 64,
    "v1_total": 1738,
    "v1_efect": 1674,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 3.72,
    "especialidad": "COLSUBSIDIO SF OLAYA SURA",
    "ciudad": "BOGOTA",
    "departamento": "BOGOTA"
  }, {
    "total": 1646,
    "efectivos": 1532,
    "no_efectivos": 114,
    "v1_total": 1646,
    "v1_efect": 1532,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 26.94,
    "especialidad": "COLSUBSIDIO DROG. MALL CARTAGENA",
    "ciudad": "CARTAGENA",
    "departamento": "BOLIVAR"
  }, {
    "total": 1417,
    "efectivos": 1378,
    "no_efectivos": 39,
    "v1_total": 1388,
    "v1_efect": 1377,
    "v2_total": 29,
    "v2_efect": 1,
    "t_prom": 36.36,
    "especialidad": "DROG SAN VICENTE MEDELLIN MIXTA",
    "ciudad": "MEDELLIN",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 1387,
    "efectivos": 1324,
    "no_efectivos": 63,
    "v1_total": 1376,
    "v1_efect": 1324,
    "v2_total": 11,
    "v2_efect": 0,
    "t_prom": 13.25,
    "especialidad": "DROGUERIA CANAL DIGITAL ANTIOQUIA",
    "ciudad": "MEDELLIN",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 1374,
    "efectivos": 1163,
    "no_efectivos": 211,
    "v1_total": 1374,
    "v1_efect": 1163,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 12.28,
    "especialidad": "TRASLADOS IPS",
    "ciudad": "BOGOTA",
    "departamento": "BOGOTA"
  }, {
    "total": 1366,
    "efectivos": 1212,
    "no_efectivos": 154,
    "v1_total": 1366,
    "v1_efect": 1212,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 31.55,
    "especialidad": "COLSUBSIDIO DISP. TUNJA",
    "ciudad": "TUNJA",
    "departamento": "BOYACA"
  }, {
    "total": 1162,
    "efectivos": 1144,
    "no_efectivos": 18,
    "v1_total": 1153,
    "v1_efect": 1140,
    "v2_total": 9,
    "v2_efect": 4,
    "t_prom": 33.62,
    "especialidad": "DROGUERIA MIXTA LAURELES",
    "ciudad": "MEDELLIN",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 1115,
    "efectivos": 1105,
    "no_efectivos": 10,
    "v1_total": 1115,
    "v1_efect": 1105,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 9.46,
    "especialidad": "COLSUBSIDIO DROG. EDIFICIO VANGUARDIA - BOGOTA",
    "ciudad": "BOGOTA",
    "departamento": "BOGOTA"
  }, {
    "total": 1066,
    "efectivos": 1049,
    "no_efectivos": 17,
    "v1_total": 1052,
    "v1_efect": 1040,
    "v2_total": 14,
    "v2_efect": 9,
    "t_prom": 29.87,
    "especialidad": "DROG UNISALUD MEDELLIN",
    "ciudad": "MEDELLIN",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 941,
    "efectivos": 907,
    "no_efectivos": 34,
    "v1_total": 941,
    "v1_efect": 907,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 22.96,
    "especialidad": "COLSUBSIDIO SF. UNIFICADO BUGA",
    "ciudad": "BUGA",
    "departamento": "VALLE DEL CAUCA"
  }, {
    "total": 834,
    "efectivos": 777,
    "no_efectivos": 57,
    "v1_total": 795,
    "v1_efect": 777,
    "v2_total": 39,
    "v2_efect": 0,
    "t_prom": 17.64,
    "especialidad": "DROGUERIA COLISEO FUNZA",
    "ciudad": "FUNZA",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 774,
    "efectivos": 768,
    "no_efectivos": 6,
    "v1_total": 774,
    "v1_efect": 768,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 31.6,
    "especialidad": "COLSUBSIDIO DROG. SAN VICENTE MEDELLIN MIXTA",
    "ciudad": "MEDELLIN",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 766,
    "efectivos": 739,
    "no_efectivos": 27,
    "v1_total": 766,
    "v1_efect": 739,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 26.94,
    "especialidad": "COLSUBSIDIO SF NEPS APARTADO",
    "ciudad": "APARTADO",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 712,
    "efectivos": 711,
    "no_efectivos": 1,
    "v1_total": 712,
    "v1_efect": 711,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 1.36,
    "especialidad": "COLSUBSIDIO DROG. PAIPA MIXTA",
    "ciudad": "PAIPA",
    "departamento": "BOYACA"
  }, {
    "total": 662,
    "efectivos": 613,
    "no_efectivos": 49,
    "v1_total": 616,
    "v1_efect": 612,
    "v2_total": 46,
    "v2_efect": 1,
    "t_prom": 29.83,
    "especialidad": "SF ZIPAQUIRA",
    "ciudad": "ZIPAQUIRA",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 593,
    "efectivos": 563,
    "no_efectivos": 30,
    "v1_total": 593,
    "v1_efect": 563,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 18.87,
    "especialidad": "DROGUERIA CALLE 49 MARLY",
    "ciudad": "BOGOTA",
    "departamento": "BOGOTA"
  }, {
    "total": 585,
    "efectivos": 581,
    "no_efectivos": 4,
    "v1_total": 585,
    "v1_efect": 581,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 4.94,
    "especialidad": "COLSUBSIDIO DROG. CAR. PLAZA CTG",
    "ciudad": "CARTAGENA",
    "departamento": "BOLIVAR"
  }, {
    "total": 531,
    "efectivos": 485,
    "no_efectivos": 46,
    "v1_total": 531,
    "v1_efect": 485,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 32.67,
    "especialidad": "COLSUBSIDIO DROG. ZIPAQUIRA A.C. - MIXTA",
    "ciudad": "ZIPAQUIRA",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 525,
    "efectivos": 501,
    "no_efectivos": 24,
    "v1_total": 525,
    "v1_efect": 501,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 19.92,
    "especialidad": "COLSUBSIDIO SF. UNISALUD MANIZALES",
    "ciudad": "MANIZALES",
    "departamento": "QUINDIO"
  }, {
    "total": 519,
    "efectivos": 491,
    "no_efectivos": 28,
    "v1_total": 519,
    "v1_efect": 491,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 30.81,
    "especialidad": "COLSUBSIDIO DISP. UNIVERSIDAD NACIONAL - BOGOTA",
    "ciudad": "BOGOTA",
    "departamento": "BOGOTA"
  }, {
    "total": 494,
    "efectivos": 464,
    "no_efectivos": 30,
    "v1_total": 494,
    "v1_efect": 464,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 14.49,
    "especialidad": "COLSUBSIDIO DROG. SOGAMOSO A.C. - MIXTA",
    "ciudad": "SOGAMOSO",
    "departamento": "BOYACA"
  }, {
    "total": 473,
    "efectivos": 431,
    "no_efectivos": 42,
    "v1_total": 464,
    "v1_efect": 427,
    "v2_total": 9,
    "v2_efect": 4,
    "t_prom": 28.05,
    "especialidad": "DROG CC LA LIBERTAD",
    "ciudad": "CHIA",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 471,
    "efectivos": 471,
    "no_efectivos": 0,
    "v1_total": 471,
    "v1_efect": 471,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 0.41,
    "especialidad": "COLSUBSIDIO DROG. CC ZAZUE PLAZA",
    "ciudad": "SANTA MARTHA",
    "departamento": "MAGDALENA"
  }, {
    "total": 463,
    "efectivos": 433,
    "no_efectivos": 30,
    "v1_total": 463,
    "v1_efect": 433,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 36.7,
    "especialidad": "COLSUBSIDIO SF TUNJA",
    "ciudad": "TUNJA",
    "departamento": "BOYACA"
  }, {
    "total": 441,
    "efectivos": 428,
    "no_efectivos": 13,
    "v1_total": 441,
    "v1_efect": 428,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 27.04,
    "especialidad": "COLSUBSIDIO DISP. UNISALUD MEDELLIN",
    "ciudad": "MEDELLIN",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 440,
    "efectivos": 439,
    "no_efectivos": 1,
    "v1_total": 440,
    "v1_efect": 439,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 0.67,
    "especialidad": "COLSUBSIDIO DROG CC SAN FERNANDO",
    "ciudad": "CARTAGENA",
    "departamento": "BOLIVAR"
  }, {
    "total": 424,
    "efectivos": 390,
    "no_efectivos": 34,
    "v1_total": 422,
    "v1_efect": 390,
    "v2_total": 2,
    "v2_efect": 0,
    "t_prom": 24.72,
    "especialidad": "DROG MIXTA LAS QUINTAS",
    "ciudad": "TUNJA",
    "departamento": "BOYACA"
  }, {
    "total": 405,
    "efectivos": 404,
    "no_efectivos": 1,
    "v1_total": 405,
    "v1_efect": 404,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 1.9,
    "especialidad": "COLSUBSIDIO DROG. CENTRO COMERCIAL IWOKA SOGAMOSO",
    "ciudad": "SOGAMOSO",
    "departamento": "BOYACA"
  }, {
    "total": 390,
    "efectivos": 370,
    "no_efectivos": 20,
    "v1_total": 388,
    "v1_efect": 370,
    "v2_total": 2,
    "v2_efect": 0,
    "t_prom": 17.43,
    "especialidad": "DROG. RESTREPO CRA 19. BOGOTA",
    "ciudad": "BOGOTA",
    "departamento": "BOGOTA"
  }, {
    "total": 354,
    "efectivos": 351,
    "no_efectivos": 3,
    "v1_total": 354,
    "v1_efect": 351,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 2.17,
    "especialidad": "COLSUBSIDIO DROG. UNICENTRO TUNJA",
    "ciudad": "TUNJA",
    "departamento": "BOYACA"
  }, {
    "total": 336,
    "efectivos": 265,
    "no_efectivos": 71,
    "v1_total": 336,
    "v1_efect": 265,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 31.03,
    "especialidad": "COLSUBSIDIO DROG. CC LA LIBERTAD",
    "ciudad": "CHIA",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 335,
    "efectivos": 318,
    "no_efectivos": 17,
    "v1_total": 335,
    "v1_efect": 318,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 17.24,
    "especialidad": "COLSUBSIDIO DROG. DUITAMA A.C. - MIXTA",
    "ciudad": "DUITAMA",
    "departamento": "BOYACA"
  }, {
    "total": 324,
    "efectivos": 315,
    "no_efectivos": 9,
    "v1_total": 324,
    "v1_efect": 315,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 5.24,
    "especialidad": "COLSUBSIDIO DROG. MARLY - MIXTA BOGOTA",
    "ciudad": "BOGOTA",
    "departamento": "BOGOTA"
  }, {
    "total": 322,
    "efectivos": 316,
    "no_efectivos": 6,
    "v1_total": 322,
    "v1_efect": 316,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 3.86,
    "especialidad": "DROGUERIA VIA 65",
    "ciudad": "BARRANQUILLA",
    "departamento": "ATLANTICO"
  }, {
    "total": 319,
    "efectivos": 293,
    "no_efectivos": 26,
    "v1_total": 319,
    "v1_efect": 293,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 31.98,
    "especialidad": "COLSUBSIDIO SF ZIPAQUIRA",
    "ciudad": "ZIPAQUIRA",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 317,
    "efectivos": 306,
    "no_efectivos": 11,
    "v1_total": 310,
    "v1_efect": 306,
    "v2_total": 7,
    "v2_efect": 0,
    "t_prom": 21.78,
    "especialidad": "SF ITAGUI LA GLORIA",
    "ciudad": "MEDELLIN",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 282,
    "efectivos": 273,
    "no_efectivos": 9,
    "v1_total": 282,
    "v1_efect": 273,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 1.73,
    "especialidad": "COLSUBSIDIO DROG. CLINICA SANTA FE - MIXTA BOGOTA",
    "ciudad": "BOGOTA",
    "departamento": "BOGOTA"
  }, {
    "total": 281,
    "efectivos": 276,
    "no_efectivos": 5,
    "v1_total": 281,
    "v1_efect": 276,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 30.85,
    "especialidad": "DROGUERIA MIXTA ENVIGADO PARQUE",
    "ciudad": "ENVIGADO",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 275,
    "efectivos": 250,
    "no_efectivos": 25,
    "v1_total": 275,
    "v1_efect": 250,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 10.91,
    "especialidad": "COLSUBSIDIO SF SURA CARTAGENA",
    "ciudad": "CARTAGENA",
    "departamento": "BOLIVAR"
  }, {
    "total": 261,
    "efectivos": 250,
    "no_efectivos": 11,
    "v1_total": 261,
    "v1_efect": 250,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 2.29,
    "especialidad": "COLSUBSIDIO DROG. DEP. DUITAMA",
    "ciudad": "DUITAMA",
    "departamento": "BOYACA"
  }, {
    "total": 261,
    "efectivos": 250,
    "no_efectivos": 11,
    "v1_total": 261,
    "v1_efect": 250,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 10.12,
    "especialidad": "COLSUBSIDIO OPERACION DOMICILIOS ANTIOQUIA",
    "ciudad": "MEDELLIN",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 258,
    "efectivos": 256,
    "no_efectivos": 2,
    "v1_total": 258,
    "v1_efect": 256,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 2.41,
    "especialidad": "DROGUERIA CALLE 14 DUITAMA",
    "ciudad": "DUITAMA",
    "departamento": "BOYACA"
  }, {
    "total": 257,
    "efectivos": 246,
    "no_efectivos": 11,
    "v1_total": 256,
    "v1_efect": 246,
    "v2_total": 1,
    "v2_efect": 0,
    "t_prom": 0.61,
    "especialidad": "DROGUERIA VALLE DE LILI CR 98 CALI",
    "ciudad": "CALI",
    "departamento": "VALLE DEL CAUCA"
  }, {
    "total": 256,
    "efectivos": 255,
    "no_efectivos": 1,
    "v1_total": 256,
    "v1_efect": 255,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 1.35,
    "especialidad": "COLSUBSIDIO DROG. SERENA DEL MAR",
    "ciudad": "CARTAGENA",
    "departamento": "BOLIVAR"
  }, {
    "total": 231,
    "efectivos": 219,
    "no_efectivos": 12,
    "v1_total": 231,
    "v1_efect": 219,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 25.69,
    "especialidad": "COLSUBSIDIO DISP. IBAGUE CENTRO POS",
    "ciudad": "IBAGUE",
    "departamento": "TOLIMA"
  }, {
    "total": 224,
    "efectivos": 218,
    "no_efectivos": 6,
    "v1_total": 224,
    "v1_efect": 218,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 1.21,
    "especialidad": "COLSUBSIDIO DROG. CC UNICENTRO GIRARDOT",
    "ciudad": "GIRARDOT",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 222,
    "efectivos": 220,
    "no_efectivos": 2,
    "v1_total": 221,
    "v1_efect": 220,
    "v2_total": 1,
    "v2_efect": 0,
    "t_prom": 9.69,
    "especialidad": "DROG C BLANCA MADRID",
    "ciudad": "MADRID",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 219,
    "efectivos": 217,
    "no_efectivos": 2,
    "v1_total": 219,
    "v1_efect": 217,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 0.53,
    "especialidad": "COLSUBSIDIO DROG. VILLA DE LEYVA",
    "ciudad": "VILLA DE LEIVA",
    "departamento": "BOYACA"
  }, {
    "total": 217,
    "efectivos": 204,
    "no_efectivos": 13,
    "v1_total": 217,
    "v1_efect": 204,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 1.9,
    "especialidad": "COLSUBSIDIO DROG. CC INNOVO MIXTA",
    "ciudad": "DUITAMA",
    "departamento": "BOYACA"
  }, {
    "total": 217,
    "efectivos": 205,
    "no_efectivos": 12,
    "v1_total": 205,
    "v1_efect": 205,
    "v2_total": 12,
    "v2_efect": 0,
    "t_prom": 6.81,
    "especialidad": "DROG SOGAMOSO AC MIXTA",
    "ciudad": "SOGAMOSO",
    "departamento": "BOYACA"
  }, {
    "total": 212,
    "efectivos": 212,
    "no_efectivos": 0,
    "v1_total": 212,
    "v1_efect": 212,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 1.25,
    "especialidad": "COLSUBSIDIO DROG. GIRARDOT A.C. - MIXTA",
    "ciudad": "GIRARDOT",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 207,
    "efectivos": 204,
    "no_efectivos": 3,
    "v1_total": 205,
    "v1_efect": 204,
    "v2_total": 2,
    "v2_efect": 0,
    "t_prom": 2.9,
    "especialidad": "DROG CENTRO COMERCIAL IWOKA SOGAMOSO",
    "ciudad": "SOGAMOSO",
    "departamento": "BOYACA"
  }, {
    "total": 206,
    "efectivos": 201,
    "no_efectivos": 5,
    "v1_total": 203,
    "v1_efect": 201,
    "v2_total": 3,
    "v2_efect": 0,
    "t_prom": 2.84,
    "especialidad": "DROG CC FONTANAR CHIA",
    "ciudad": "CHIA",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 203,
    "efectivos": 203,
    "no_efectivos": 0,
    "v1_total": 203,
    "v1_efect": 203,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 5.77,
    "especialidad": "CANAL MAYORISTA ANTIOQUIA",
    "ciudad": "MEDELLIN",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 198,
    "efectivos": 194,
    "no_efectivos": 4,
    "v1_total": 198,
    "v1_efect": 194,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 0.76,
    "especialidad": "COLSUBSIDIO DROG. CC LLANOCENTRO",
    "ciudad": "VILLAVICENCIO",
    "departamento": "META"
  }, {
    "total": 196,
    "efectivos": 189,
    "no_efectivos": 7,
    "v1_total": 196,
    "v1_efect": 189,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 10.41,
    "especialidad": "COLSUBSIDIO DROG. AV CIRCUNVALAR - PEREIRA",
    "ciudad": "PEREIRA",
    "departamento": "RISARALDA"
  }, {
    "total": 194,
    "efectivos": 191,
    "no_efectivos": 3,
    "v1_total": 193,
    "v1_efect": 191,
    "v2_total": 1,
    "v2_efect": 0,
    "t_prom": 0.45,
    "especialidad": "DROGUERIA VALLE DEL LILI 42",
    "ciudad": "CALI",
    "departamento": "VALLE DEL CAUCA"
  }, {
    "total": 187,
    "efectivos": 187,
    "no_efectivos": 0,
    "v1_total": 186,
    "v1_efect": 186,
    "v2_total": 1,
    "v2_efect": 1,
    "t_prom": 11.25,
    "especialidad": "SF NEPS RIONEGRO",
    "ciudad": "RIONEGRO",
    "departamento": "ANTIOQUIA"
  }, {
    "total": 186,
    "efectivos": 170,
    "no_efectivos": 16,
    "v1_total": 184,
    "v1_efect": 170,
    "v2_total": 2,
    "v2_efect": 0,
    "t_prom": 4.11,
    "especialidad": "DROG LAS HUERTAS CAJICA",
    "ciudad": "CAJICA",
    "departamento": "CUNDINAMARCA"
  }, {
    "total": 183,
    "efectivos": 182,
    "no_efectivos": 1,
    "v1_total": 183,
    "v1_efect": 182,
    "v2_total": 0,
    "v2_efect": 0,
    "t_prom": 11.79,
    "especialidad": "SF ALMACENTRO ALTO COSTO AC",
    "ciudad": "MEDELLIN",
    "departamento": "ANTIOQUIA"
  }],
  "by_nov": [{
    "novedad": "NADIE PARA RECIBIR",
    "cluster": "AUSENCIA",
    "count": 589
  }, {
    "novedad": "DIRECCION ERRADA",
    "cluster": "DIRECCION",
    "count": 367
  }, {
    "novedad": "RECHAZADO POR EL USUARIO",
    "cluster": "RECHAZO",
    "count": 334
  }, {
    "novedad": "CLIENTE NO RESIDE",
    "cluster": "AUSENCIA",
    "count": 137
  }, {
    "novedad": "NO ENTREGADO POR PUNTO DE VENTA",
    "cluster": "OPERATIVO",
    "count": 97
  }, {
    "novedad": "MEDICAMENTOS INCOMPLETOS",
    "cluster": "PRODUCTO",
    "count": 68
  }, {
    "novedad": "CIUDAD INCORRECTA",
    "cluster": "DIRECCION",
    "count": 48
  }, {
    "novedad": "YA RECLAMO EL MEDICAMENTO",
    "cluster": "RECHAZO",
    "count": 41
  }, {
    "novedad": "NO CUENTA CON MEDIO DE PAGO",
    "cluster": "PAGO",
    "count": 28
  }, {
    "novedad": "SIN FORMULA / SIN TIRILLA",
    "cluster": "PRODUCTO",
    "count": 20
  }, {
    "novedad": "ENTREGADO PREVIAMENTE",
    "cluster": "OTRO",
    "count": 18
  }, {
    "novedad": "ZONA ROJA",
    "cluster": "OTRO",
    "count": 11
  }],
  "by_heatmap": [{
    "departamento": "CUNDINAMARCA",
    "ciudad": "ZIPAQUIRA",
    "especialidad": "DROG ZIPAQUIRA AC MIXTA",
    "total": 47,
    "efectivos": 32,
    "eff": 68.1,
    "t_prom": 18.59
  }, {
    "departamento": "VALLE DEL CAUCA",
    "ciudad": "PALMIRA",
    "especialidad": "DROGUERIA UNICENTRO PALMIRA",
    "total": 62,
    "efectivos": 44,
    "eff": 71.0,
    "t_prom": 3.17
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "CHIA",
    "especialidad": "COLSUBSIDIO DROG. CC LA LIBERTAD",
    "total": 336,
    "efectivos": 265,
    "eff": 78.9,
    "t_prom": 31.03
  }, {
    "departamento": "BOGOTA",
    "ciudad": "BOGOTA",
    "especialidad": "DROG CRUZ ROJA",
    "total": 37,
    "efectivos": 30,
    "eff": 81.1,
    "t_prom": 5.82
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "ITAGUI",
    "especialidad": "COLSUBSIDIO SF ITAGUI LAS ACACIAS",
    "total": 145,
    "efectivos": 118,
    "eff": 81.4,
    "t_prom": 4.76
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "CHIA",
    "especialidad": "COLSUBSIDIO SF CHIA",
    "total": 43,
    "efectivos": 35,
    "eff": 81.4,
    "t_prom": 40.98
  }, {
    "departamento": "BOYACA",
    "ciudad": "DUITAMA",
    "especialidad": "DROG CC INNOVO MIXTA",
    "total": 106,
    "efectivos": 87,
    "eff": 82.1,
    "t_prom": 3.98
  }, {
    "departamento": "BOGOTA",
    "ciudad": "BOGOTA",
    "especialidad": "TRASLADOS IPS",
    "total": 1374,
    "efectivos": 1163,
    "eff": 84.6,
    "t_prom": 12.28
  }, {
    "departamento": "BOGOTA",
    "ciudad": "BOGOTA",
    "especialidad": "DISP UNIVERSIDAD NACIONAL BOGOTA",
    "total": 152,
    "efectivos": 132,
    "eff": 86.8,
    "t_prom": 16.4
  }, {
    "departamento": "BOYACA",
    "ciudad": "TUNJA",
    "especialidad": "DISP TUNJA",
    "total": 88,
    "efectivos": 77,
    "eff": 87.5,
    "t_prom": 39.16
  }, {
    "departamento": "BOGOTA",
    "ciudad": "BOGOTA",
    "especialidad": "NODO DOMICILIOS KENNEDY",
    "total": 106,
    "efectivos": 94,
    "eff": 88.7,
    "t_prom": 10.46
  }, {
    "departamento": "BOYACA",
    "ciudad": "TUNJA",
    "especialidad": "COLSUBSIDIO DISP. TUNJA",
    "total": 1366,
    "efectivos": 1212,
    "eff": 88.7,
    "t_prom": 31.55
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "CAJICA",
    "especialidad": "DROG ISLA NATURA",
    "total": 103,
    "efectivos": 93,
    "eff": 90.3,
    "t_prom": 5.32
  }, {
    "departamento": "VALLE DEL CAUCA",
    "ciudad": "CALI",
    "especialidad": "COLSUBSIDIO DROG. LA 66",
    "total": 95,
    "efectivos": 86,
    "eff": 90.5,
    "t_prom": 18.45
  }, {
    "departamento": "BOLIVAR",
    "ciudad": "CARTAGENA",
    "especialidad": "COLSUBSIDIO SF SURA CARTAGENA",
    "total": 275,
    "efectivos": 250,
    "eff": 90.9,
    "t_prom": 10.91
  }, {
    "departamento": "RISARALDA",
    "ciudad": "PEREIRA",
    "especialidad": "DROG AV CIRCUNVALAR PEREIRA",
    "total": 44,
    "efectivos": 40,
    "eff": 90.9,
    "t_prom": 10.45
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "CHIA",
    "especialidad": "DROG CC LA LIBERTAD",
    "total": 473,
    "efectivos": 431,
    "eff": 91.1,
    "t_prom": 28.05
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "ZIPAQUIRA",
    "especialidad": "COLSUBSIDIO DROG. ZIPAQUIRA A.C. - MIXTA",
    "total": 531,
    "efectivos": 485,
    "eff": 91.3,
    "t_prom": 32.67
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "CAJICA",
    "especialidad": "DROG LAS HUERTAS CAJICA",
    "total": 186,
    "efectivos": 170,
    "eff": 91.4,
    "t_prom": 4.11
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "MOSQUERA",
    "especialidad": "COLSUBSIDIO DROG. CC. ECO PLAZA",
    "total": 94,
    "efectivos": 86,
    "eff": 91.5,
    "t_prom": 4.78
  }, {
    "departamento": "VALLE DEL CAUCA",
    "ciudad": "PALMIRA",
    "especialidad": "COLSUBSIDIO DROG. UNICENTRO PALMIRA",
    "total": 129,
    "efectivos": 118,
    "eff": 91.5,
    "t_prom": 3.6
  }, {
    "departamento": "BOGOTA",
    "ciudad": "BOGOTA",
    "especialidad": "COLSUBSIDIO SF PLAZA CENTRAL",
    "total": 98,
    "efectivos": 90,
    "eff": 91.8,
    "t_prom": 25.63
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "ZIPAQUIRA",
    "especialidad": "COLSUBSIDIO SF ZIPAQUIRA",
    "total": 319,
    "efectivos": 293,
    "eff": 91.8,
    "t_prom": 31.98
  }, {
    "departamento": "BOYACA",
    "ciudad": "TUNJA",
    "especialidad": "DROG MIXTA LAS QUINTAS",
    "total": 424,
    "efectivos": 390,
    "eff": 92.0,
    "t_prom": 24.72
  }, {
    "departamento": "BOGOTA",
    "ciudad": "BOGOTA",
    "especialidad": "COLSUBSIDIO SF PAC SURA BOGOTA",
    "total": 52,
    "efectivos": 48,
    "eff": 92.3,
    "t_prom": 16.35
  }, {
    "departamento": "BOYACA",
    "ciudad": "TUNJA",
    "especialidad": "DROGUERIA CC CENTRO NORTE TUNJA",
    "total": 54,
    "efectivos": 50,
    "eff": 92.6,
    "t_prom": 18.87
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "ZIPAQUIRA",
    "especialidad": "SF ZIPAQUIRA",
    "total": 662,
    "efectivos": 613,
    "eff": 92.6,
    "t_prom": 29.83
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "CHIA",
    "especialidad": "DROG CC BAZZAR CHIA",
    "total": 84,
    "efectivos": 78,
    "eff": 92.9,
    "t_prom": 1.48
  }, {
    "departamento": "BOLIVAR",
    "ciudad": "CARTAGENA",
    "especialidad": "COLSUBSIDIO DROG. MALL CARTAGENA",
    "total": 1646,
    "efectivos": 1532,
    "eff": 93.1,
    "t_prom": 26.94
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "FUNZA",
    "especialidad": "DROGUERIA COLISEO FUNZA",
    "total": 834,
    "efectivos": 777,
    "eff": 93.2,
    "t_prom": 17.64
  }, {
    "departamento": "BOGOTA",
    "ciudad": "BOGOTA",
    "especialidad": "SF CHAPINERO",
    "total": 76,
    "efectivos": 71,
    "eff": 93.4,
    "t_prom": 11.22
  }, {
    "departamento": "BOYACA",
    "ciudad": "TUNJA",
    "especialidad": "COLSUBSIDIO SF TUNJA",
    "total": 463,
    "efectivos": 433,
    "eff": 93.5,
    "t_prom": 36.7
  }, {
    "departamento": "BOYACA",
    "ciudad": "SOGAMOSO",
    "especialidad": "COLSUBSIDIO DROG. SOGAMOSO A.C. - MIXTA",
    "total": 494,
    "efectivos": 464,
    "eff": 93.9,
    "t_prom": 14.49
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "COTA",
    "especialidad": "DROG VIVENZA MIXTA",
    "total": 33,
    "efectivos": 31,
    "eff": 93.9,
    "t_prom": 3.12
  }, {
    "departamento": "BOYACA",
    "ciudad": "DUITAMA",
    "especialidad": "COLSUBSIDIO DROG. CC INNOVO MIXTA",
    "total": 217,
    "efectivos": 204,
    "eff": 94.0,
    "t_prom": 1.9
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "CAJICA",
    "especialidad": "COLSUBSIDIO DROG. LAS HUERTAS CAJICA",
    "total": 35,
    "efectivos": 33,
    "eff": 94.3,
    "t_prom": 0.97
  }, {
    "departamento": "BOYACA",
    "ciudad": "SOGAMOSO",
    "especialidad": "DROG SOGAMOSO AC MIXTA",
    "total": 217,
    "efectivos": 205,
    "eff": 94.5,
    "t_prom": 6.81
  }, {
    "departamento": "BOGOTA",
    "ciudad": "BOGOTA",
    "especialidad": "COLSUBSIDIO DISP. UNIVERSIDAD NACIONAL - BOGOTA",
    "total": 519,
    "efectivos": 491,
    "eff": 94.6,
    "t_prom": 30.81
  }, {
    "departamento": "TOLIMA",
    "ciudad": "IBAGUE",
    "especialidad": "COLSUBSIDIO DISP. IBAGUE CENTRO POS",
    "total": 231,
    "efectivos": 219,
    "eff": 94.8,
    "t_prom": 25.69
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "MEDELLIN",
    "especialidad": "DROG AV POBLADO MEDELLIN MIXTA",
    "total": 59,
    "efectivos": 56,
    "eff": 94.9,
    "t_prom": 16.84
  }, {
    "departamento": "BOGOTA",
    "ciudad": "BOGOTA",
    "especialidad": "DROG. RESTREPO CRA 19. BOGOTA",
    "total": 390,
    "efectivos": 370,
    "eff": 94.9,
    "t_prom": 17.43
  }, {
    "departamento": "BOGOTA",
    "ciudad": "BOGOTA",
    "especialidad": "DROGUERIA CALLE 49 MARLY",
    "total": 593,
    "efectivos": 563,
    "eff": 94.9,
    "t_prom": 18.87
  }, {
    "departamento": "BOYACA",
    "ciudad": "DUITAMA",
    "especialidad": "COLSUBSIDIO DROG. DUITAMA A.C. - MIXTA",
    "total": 335,
    "efectivos": 318,
    "eff": 94.9,
    "t_prom": 17.24
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "CHIA",
    "especialidad": "DROG SABANA NORTE",
    "total": 98,
    "efectivos": 93,
    "eff": 94.9,
    "t_prom": 3.63
  }, {
    "departamento": "QUINDIO",
    "ciudad": "MANIZALES",
    "especialidad": "COLSUBSIDIO SF. UNISALUD MANIZALES",
    "total": 525,
    "efectivos": 501,
    "eff": 95.4,
    "t_prom": 19.92
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "MEDELLIN",
    "especialidad": "DROGUERIA CANAL DIGITAL ANTIOQUIA",
    "total": 1387,
    "efectivos": 1324,
    "eff": 95.5,
    "t_prom": 13.25
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "ZIPAQUIRA",
    "especialidad": "DROGUERIA DEPENDIENTE ZIPAQUIRA",
    "total": 46,
    "efectivos": 44,
    "eff": 95.7,
    "t_prom": 4.1
  }, {
    "departamento": "VALLE DEL CAUCA",
    "ciudad": "CALI",
    "especialidad": "DROG. LA 66",
    "total": 46,
    "efectivos": 44,
    "eff": 95.7,
    "t_prom": 7.48
  }, {
    "departamento": "VALLE DEL CAUCA",
    "ciudad": "CALI",
    "especialidad": "DROGUERIA VALLE DE LILI CR 98 CALI",
    "total": 257,
    "efectivos": 246,
    "eff": 95.7,
    "t_prom": 0.61
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "APARTADO",
    "especialidad": "SF NEPS APARTADO",
    "total": 143,
    "efectivos": 137,
    "eff": 95.8,
    "t_prom": 21.87
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "MEDELLIN",
    "especialidad": "COLSUBSIDIO OPERACION DOMICILIOS ANTIOQUIA",
    "total": 261,
    "efectivos": 250,
    "eff": 95.8,
    "t_prom": 10.12
  }, {
    "departamento": "BOYACA",
    "ciudad": "DUITAMA",
    "especialidad": "COLSUBSIDIO DROG. DEP. DUITAMA",
    "total": 261,
    "efectivos": 250,
    "eff": 95.8,
    "t_prom": 2.29
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "RIONEGRO",
    "especialidad": "COLSUBSIDIO SF NEPS RIONEGRO AC",
    "total": 100,
    "efectivos": 96,
    "eff": 96.0,
    "t_prom": 4.99
  }, {
    "departamento": "BOYACA",
    "ciudad": "DUITAMA",
    "especialidad": "DROG DUITAMA AC MIXTA",
    "total": 78,
    "efectivos": 75,
    "eff": 96.2,
    "t_prom": 4.06
  }, {
    "departamento": "TOLIMA",
    "ciudad": "IBAGUE",
    "especialidad": "COLSUBSIDIO DROG. ACQUA - IBAGUE",
    "total": 105,
    "efectivos": 101,
    "eff": 96.2,
    "t_prom": 5.5
  }, {
    "departamento": "BOGOTA",
    "ciudad": "BOGOTA",
    "especialidad": "COLSUBSIDIO SF OLAYA SURA",
    "total": 1738,
    "efectivos": 1674,
    "eff": 96.3,
    "t_prom": 3.72
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "CAJICA",
    "especialidad": "DROG CAJICA",
    "total": 134,
    "efectivos": 129,
    "eff": 96.3,
    "t_prom": 6.62
  }, {
    "departamento": "RISARALDA",
    "ciudad": "PEREIRA",
    "especialidad": "COLSUBSIDIO DROG. AV CIRCUNVALAR - PEREIRA",
    "total": 196,
    "efectivos": 189,
    "eff": 96.4,
    "t_prom": 10.41
  }, {
    "departamento": "VALLE DEL CAUCA",
    "ciudad": "BUGA",
    "especialidad": "COLSUBSIDIO SF. UNIFICADO BUGA",
    "total": 941,
    "efectivos": 907,
    "eff": 96.4,
    "t_prom": 22.96
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "APARTADO",
    "especialidad": "COLSUBSIDIO SF NEPS APARTADO",
    "total": 766,
    "efectivos": 739,
    "eff": 96.5,
    "t_prom": 26.94
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "MEDELLIN",
    "especialidad": "SF ITAGUI LA GLORIA",
    "total": 317,
    "efectivos": 306,
    "eff": 96.5,
    "t_prom": 21.78
  }, {
    "departamento": "BOYACA",
    "ciudad": "DUITAMA",
    "especialidad": "DROG CENTRO DUITAMA",
    "total": 57,
    "efectivos": 55,
    "eff": 96.5,
    "t_prom": 1.65
  }, {
    "departamento": "BOGOTA",
    "ciudad": "BOGOTA",
    "especialidad": "COLSUBSIDIO DROG SHAIO",
    "total": 176,
    "efectivos": 170,
    "eff": 96.6,
    "t_prom": 1.64
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "ZIPAQUIRA",
    "especialidad": "DROGUERIA CENTRO HISTORICO ZIPA",
    "total": 59,
    "efectivos": 57,
    "eff": 96.6,
    "t_prom": 6.96
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "CHIA",
    "especialidad": "DROG CENTRO CHIA MIXTA",
    "total": 90,
    "efectivos": 87,
    "eff": 96.7,
    "t_prom": 1.63
  }, {
    "departamento": "VALLE DEL CAUCA",
    "ciudad": "BUGA",
    "especialidad": "CENTRO COMERCIAL BUGA PLAZA",
    "total": 121,
    "efectivos": 117,
    "eff": 96.7,
    "t_prom": 19.67
  }, {
    "departamento": "BOGOTA",
    "ciudad": "BOGOTA",
    "especialidad": "COLSUBSIDIO DROG. CLINICA SANTA FE - MIXTA BOGOTA",
    "total": 282,
    "efectivos": 273,
    "eff": 96.8,
    "t_prom": 1.73
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "MEDELLIN",
    "especialidad": "COLSUBSIDIO SF ALMACENTRO ALTO COSTO A.C.",
    "total": 97,
    "efectivos": 94,
    "eff": 96.9,
    "t_prom": 5.9
  }, {
    "departamento": "BOYACA",
    "ciudad": "TUNJA",
    "especialidad": "COLSUBSIDIO DROG. TUNJA A.C. - MIXTA",
    "total": 64,
    "efectivos": 62,
    "eff": 96.9,
    "t_prom": 3.38
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "MEDELLIN",
    "especialidad": "COLSUBSIDIO DISP. UNISALUD MEDELLIN",
    "total": 441,
    "efectivos": 428,
    "eff": 97.1,
    "t_prom": 27.04
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "ENVIGADO",
    "especialidad": "DROGUERIA ARL VIVA ENVIGADO 2",
    "total": 71,
    "efectivos": 69,
    "eff": 97.2,
    "t_prom": 38.94
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "MEDELLIN",
    "especialidad": "DROG SAN VICENTE MEDELLIN MIXTA",
    "total": 1417,
    "efectivos": 1378,
    "eff": 97.2,
    "t_prom": 36.36
  }, {
    "departamento": "BOGOTA",
    "ciudad": "BOGOTA",
    "especialidad": "COLSUBSIDIO DROG. MARLY - MIXTA BOGOTA",
    "total": 324,
    "efectivos": 315,
    "eff": 97.2,
    "t_prom": 5.24
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "GIRARDOT",
    "especialidad": "COLSUBSIDIO DROG. CC UNICENTRO GIRARDOT",
    "total": 224,
    "efectivos": 218,
    "eff": 97.3,
    "t_prom": 1.21
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "MEDELLIN",
    "especialidad": "DROG CC MOLINOS MEDELLIN",
    "total": 83,
    "efectivos": 81,
    "eff": 97.6,
    "t_prom": 4.13
  }, {
    "departamento": "BOYACA",
    "ciudad": "DUITAMA",
    "especialidad": "COLSUBSIDIO DROG. CENTRO DUITAMA",
    "total": 85,
    "efectivos": 83,
    "eff": 97.6,
    "t_prom": 2.98
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "CHIA",
    "especialidad": "DROG CC FONTANAR CHIA",
    "total": 206,
    "efectivos": 201,
    "eff": 97.6,
    "t_prom": 2.84
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "LA UNION",
    "especialidad": "COLSUBSIDIO DROG. CC MACEDONIA",
    "total": 43,
    "efectivos": 42,
    "eff": 97.7,
    "t_prom": 0.67
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "MEDELLIN",
    "especialidad": "DROGUERIA MIXTA SAN DIEGO",
    "total": 136,
    "efectivos": 133,
    "eff": 97.8,
    "t_prom": 13.26
  }, {
    "departamento": "BOGOTA",
    "ciudad": "BOGOTA",
    "especialidad": "SF SURA CENTRO INTERNACIONAL AC BOGOTA",
    "total": 93,
    "efectivos": 91,
    "eff": 97.8,
    "t_prom": 30.17
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "CHIA",
    "especialidad": "SF CHIA",
    "total": 51,
    "efectivos": 50,
    "eff": 98.0,
    "t_prom": 9.3
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "MADRID",
    "especialidad": "COLSUBSIDIO DROG. CASA BLANCA - MADRID",
    "total": 49,
    "efectivos": 48,
    "eff": 98.0,
    "t_prom": 5.91
  }, {
    "departamento": "META",
    "ciudad": "VILLAVICENCIO",
    "especialidad": "COLSUBSIDIO DROG. CC LLANOCENTRO",
    "total": 198,
    "efectivos": 194,
    "eff": 98.0,
    "t_prom": 0.76
  }, {
    "departamento": "TOLIMA",
    "ciudad": "IBAGUE",
    "especialidad": "DROG ACQUA IBAGUE",
    "total": 51,
    "efectivos": 50,
    "eff": 98.0,
    "t_prom": 5.39
  }, {
    "departamento": "ATLANTICO",
    "ciudad": "BARRANQUILLA",
    "especialidad": "DROGUERIA VIA 65",
    "total": 322,
    "efectivos": 316,
    "eff": 98.1,
    "t_prom": 3.86
  }, {
    "departamento": "BOGOTA",
    "ciudad": "BOGOTA",
    "especialidad": "COLSUBSIDIO SF SURA CENTRO INTERNACIONAL A.C. - BOGOTA",
    "total": 161,
    "efectivos": 158,
    "eff": 98.1,
    "t_prom": 17.15
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "ENVIGADO",
    "especialidad": "DROGUERIA MIXTA ENVIGADO PARQUE",
    "total": 281,
    "efectivos": 276,
    "eff": 98.2,
    "t_prom": 30.85
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "COTA",
    "especialidad": "DROG ALLEGRO",
    "total": 179,
    "efectivos": 176,
    "eff": 98.3,
    "t_prom": 7.58
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "MEDELLIN",
    "especialidad": "DROG UNISALUD MEDELLIN",
    "total": 1066,
    "efectivos": 1049,
    "eff": 98.4,
    "t_prom": 29.87
  }, {
    "departamento": "RISARALDA",
    "ciudad": "MANIZALES",
    "especialidad": "COLSUBSIDIO DROG.MANIZALES MIXTA",
    "total": 61,
    "efectivos": 60,
    "eff": 98.4,
    "t_prom": 5.33
  }, {
    "departamento": "SANTANDER",
    "ciudad": "BUCARAMANGA",
    "especialidad": "DROGUERIA MIXTA DE LA CUESTA",
    "total": 63,
    "efectivos": 62,
    "eff": 98.4,
    "t_prom": 2.9
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "MEDELLIN",
    "especialidad": "DROGUERIA MIXTA LAURELES",
    "total": 1162,
    "efectivos": 1144,
    "eff": 98.5,
    "t_prom": 33.62
  }, {
    "departamento": "BOLIVAR",
    "ciudad": "CARTAGENA",
    "especialidad": "COLSUBSIDIO DROG IND SAN MARTIN",
    "total": 68,
    "efectivos": 67,
    "eff": 98.5,
    "t_prom": 2.38
  }, {
    "departamento": "VALLE DEL CAUCA",
    "ciudad": "CALI",
    "especialidad": "DROGUERIA VALLE DEL LILI 42",
    "total": 194,
    "efectivos": 191,
    "eff": 98.5,
    "t_prom": 0.45
  }, {
    "departamento": "BOYACA",
    "ciudad": "SOGAMOSO",
    "especialidad": "DROG CENTRO COMERCIAL IWOKA SOGAMOSO",
    "total": 207,
    "efectivos": 204,
    "eff": 98.6,
    "t_prom": 2.9
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "VILLETA",
    "especialidad": "COLSUBSIDIO DROG. VILLETA - MIXTA",
    "total": 145,
    "efectivos": 143,
    "eff": 98.6,
    "t_prom": 0.04
  }, {
    "departamento": "CUNDINAMARCA",
    "ciudad": "MADRID",
    "especialidad": "DROGUERIA MIXTA MADRID",
    "total": 156,
    "efectivos": 154,
    "eff": 98.7,
    "t_prom": 2.82
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "MEDELLIN",
    "especialidad": "PENDIENTES CANALES DIGITALES MEDELLIN",
    "total": 169,
    "efectivos": 167,
    "eff": 98.8,
    "t_prom": 21.7
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "MEDELLIN",
    "especialidad": "SF CRISTO REY",
    "total": 172,
    "efectivos": 170,
    "eff": 98.8,
    "t_prom": 29.54
  }, {
    "departamento": "ANTIOQUIA",
    "ciudad": "RIONEGRO",
    "especialidad": "DROG LLANO GRANDE RIONEGRO",
    "total": 169,
    "efectivos": 167,
    "eff": 98.8,
    "t_prom": 5.76
  }],
  "totals": {
    "total": 43460,
    "efectivos": 41645,
    "no_efectivos": 1815,
    "v1_total": 43156,
    "v1_efect": 41620,
    "v2_total": 304,
    "v2_efect": 25,
    "t_prom": 14.22,
    "n_ciudades": 49,
    "n_deptos": 14,
    "n_especialidades": 303
  },
  "meta": {
    "departamentos": ["ANTIOQUIA", "ATLANTICO", "BOGOTA", "BOLIVAR", "BOYACA", "CASANARE", "CUNDINAMARCA", "MAGDALENA", "META", "QUINDIO", "RISARALDA", "SANTANDER", "TOLIMA", "VALLE DEL CAUCA"],
    "ciudades_by_dept": {
      "ANTIOQUIA": ["APARTADO", "BELLO", "CARMEN DE VIBORAL", "DON MATIAS", "EL RETIRO", "ENVIGADO", "GIRARDOTA", "GUARNE", "ITAGUI", "LA CEJA", "LA UNION", "MARINILLA", "MEDELLIN", "RIONEGRO", "SANTA FE ANTIOQUIA", "SANTA ROSA DE OSOS", "YARUMAL"],
      "ATLANTICO": ["BARRANQUILLA"],
      "BOGOTA": ["BOGOTA"],
      "BOLIVAR": ["CARTAGENA"],
      "BOYACA": ["CHIQUINQUIRA", "DUITAMA", "PAIPA", "SOGAMOSO", "TUNJA", "VILLA DE LEIVA"],
      "CASANARE": ["YOPAL"],
      "CUNDINAMARCA": ["ANAPOIMA", "CAJICA", "CHIA", "COTA", "FACATATIVA", "FUNZA", "FUSAGASUGA", "GIRARDOT", "MADRID", "MOSQUERA", "VILLETA", "ZIPAQUIRA"],
      "MAGDALENA": ["SANTA MARTHA"],
      "META": ["ACACIAS", "VILLAVICENCIO"],
      "QUINDIO": ["MANIZALES"],
      "RISARALDA": ["MANIZALES", "PEREIRA"],
      "SANTANDER": ["BUCARAMANGA"],
      "TOLIMA": ["IBAGUE"],
      "VALLE DEL CAUCA": ["BUGA", "CALI", "PALMIRA"]
    },
    "meses": ["ENERO", "FEBRERO", "MARZO"],
    "semanas": ["SEMANA 1", "SEMANA 2", "SEMANA 3", "SEMANA 4", "SEMANA 5"]
  }
};
const MAP_CITIES = [{
  "name": "MEDELLIN",
  "lat": 6.2442,
  "lon": -75.5812,
  "total": 9117,
  "eff": 97.7,
  "t_prom": 22.01
}, {
  "name": "BOGOTA",
  "lat": 4.711,
  "lon": -74.0721,
  "total": 7338,
  "eff": 93.8,
  "t_prom": 10.73
}, {
  "name": "CARTAGENA",
  "lat": 10.391,
  "lon": -75.5144,
  "total": 3410,
  "eff": 95.7,
  "t_prom": 14.15
}, {
  "name": "TUNJA",
  "lat": 5.5353,
  "lon": -73.3678,
  "total": 3351,
  "eff": 92.8,
  "t_prom": 22.62
}, {
  "name": "ZIPAQUIRA",
  "lat": 5.0224,
  "lon": -74.0058,
  "total": 1664,
  "eff": 91.6,
  "t_prom": 29.2
}, {
  "name": "DUITAMA",
  "lat": 5.8267,
  "lon": -73.0333,
  "total": 1485,
  "eff": 95.3,
  "t_prom": 5.78
}, {
  "name": "CHIA",
  "lat": 4.8637,
  "lon": -74.054,
  "total": 1408,
  "eff": 90.0,
  "t_prom": 18.24
}, {
  "name": "SOGAMOSO",
  "lat": 5.7145,
  "lon": -72.9334,
  "total": 1324,
  "eff": 96.5,
  "t_prom": 7.38
}, {
  "name": "RIONEGRO",
  "lat": 6.1517,
  "lon": -75.3743,
  "total": 1114,
  "eff": 99.5,
  "t_prom": 9.06
}, {
  "name": "BUGA",
  "lat": 3.9004,
  "lon": -76.3033,
  "total": 1062,
  "eff": 96.4,
  "t_prom": 22.74
}, {
  "name": "APARTADO",
  "lat": 7.883,
  "lon": -76.6258,
  "total": 987,
  "eff": 96.7,
  "t_prom": 24.31
}, {
  "name": "FUNZA",
  "lat": 4.7175,
  "lon": -74.211,
  "total": 927,
  "eff": 93.9,
  "t_prom": 16.18
}, {
  "name": "PAIPA",
  "lat": 5.7833,
  "lon": -73.1131,
  "total": 884,
  "eff": 99.9,
  "t_prom": 1.43
}, {
  "name": "CALI",
  "lat": 3.4516,
  "lon": -76.532,
  "total": 832,
  "eff": 96.5,
  "t_prom": 3.17
}, {
  "name": "GIRARDOT",
  "lat": 4.3024,
  "lon": -74.802,
  "total": 689,
  "eff": 99.1,
  "t_prom": 1.44
}, {
  "name": "MANIZALES",
  "lat": 5.0689,
  "lon": -75.5174,
  "total": 637,
  "eff": 96.2,
  "t_prom": 19.18
}, {
  "name": "VILLAVICENCIO",
  "lat": 4.142,
  "lon": -73.6266,
  "total": 590,
  "eff": 98.8,
  "t_prom": 0.86
}, {
  "name": "SANTA MARTHA",
  "lat": 11.2408,
  "lon": -74.199,
  "total": 471,
  "eff": 100.0,
  "t_prom": 0.41
}, {
  "name": "CAJICA",
  "lat": 4.9191,
  "lon": -74.0286,
  "total": 462,
  "eff": 92.9,
  "t_prom": 4.84
}, {
  "name": "MADRID",
  "lat": 4.7315,
  "lon": -74.2642,
  "total": 458,
  "eff": 98.9,
  "t_prom": 6.41
}, {
  "name": "MOSQUERA",
  "lat": 4.7067,
  "lon": -74.2329,
  "total": 416,
  "eff": 97.6,
  "t_prom": 3.79
}, {
  "name": "BARRANQUILLA",
  "lat": 10.9685,
  "lon": -74.7813,
  "total": 394,
  "eff": 98.2,
  "t_prom": 3.45
}, {
  "name": "IBAGUE",
  "lat": 4.4389,
  "lon": -75.2322,
  "total": 393,
  "eff": 95.7,
  "t_prom": 17.28
}, {
  "name": "CHIQUINQUIRA",
  "lat": 5.6165,
  "lon": -73.8194,
  "total": 387,
  "eff": 100.0,
  "t_prom": 6.99
}, {
  "name": "ENVIGADO",
  "lat": 6.171,
  "lon": -75.5907,
  "total": 353,
  "eff": 98.0,
  "t_prom": 31.46
}, {
  "name": "MANIZALES",
  "lat": 5.0689,
  "lon": -75.5174,
  "total": 331,
  "eff": 99.7,
  "t_prom": 5.71
}, {
  "name": "VILLA DE LEIVA",
  "lat": 5.6341,
  "lon": -73.5248,
  "total": 301,
  "eff": 99.3,
  "t_prom": 1.05
}, {
  "name": "FACATATIVA",
  "lat": 4.8133,
  "lon": -74.3556,
  "total": 274,
  "eff": 99.3,
  "t_prom": 2.75
}, {
  "name": "COTA",
  "lat": 4.8118,
  "lon": -74.1018,
  "total": 249,
  "eff": 98.0,
  "t_prom": 7.2
}, {
  "name": "PEREIRA",
  "lat": 4.8133,
  "lon": -75.6961,
  "total": 240,
  "eff": 95.4,
  "t_prom": 10.42
}, {
  "name": "PALMIRA",
  "lat": 3.5394,
  "lon": -76.3036,
  "total": 234,
  "eff": 87.2,
  "t_prom": 3.71
}, {
  "name": "YARUMAL",
  "lat": 6.9646,
  "lon": -75.4211,
  "total": 209,
  "eff": 100.0,
  "t_prom": 15.49
}, {
  "name": "BUCARAMANGA",
  "lat": 7.1254,
  "lon": -73.1198,
  "total": 197,
  "eff": 99.5,
  "t_prom": 4.28
}, {
  "name": "ITAGUI",
  "lat": 6.1845,
  "lon": -75.5994,
  "total": 167,
  "eff": 83.8,
  "t_prom": 5.68
}, {
  "name": "BELLO",
  "lat": 6.3384,
  "lon": -75.5546,
  "total": 160,
  "eff": 97.5,
  "t_prom": 10.89
}, {
  "name": "VILLETA",
  "lat": 5.0147,
  "lon": -74.4734,
  "total": 145,
  "eff": 98.6,
  "t_prom": 0.04
}, {
  "name": "LA UNION",
  "lat": 5.972,
  "lon": -75.3617,
  "total": 140,
  "eff": 98.6,
  "t_prom": 3.12
}, {
  "name": "FUSAGASUGA",
  "lat": 4.3475,
  "lon": -74.3634,
  "total": 139,
  "eff": 99.3,
  "t_prom": 8.71
}, {
  "name": "ANAPOIMA",
  "lat": 4.5516,
  "lon": -74.5364,
  "total": 111,
  "eff": 100.0,
  "t_prom": 0.55
}, {
  "name": "YOPAL",
  "lat": 5.3379,
  "lon": -72.3961,
  "total": 88,
  "eff": 100.0,
  "t_prom": 0.57
}, {
  "name": "MARINILLA",
  "lat": 6.1757,
  "lon": -75.3359,
  "total": 32,
  "eff": 90.6,
  "t_prom": 8.7
}];
const pct = (n, d) => d > 0 ? n / d * 100 : 0;
const fmt = v => typeof v === 'number' ? v >= 1000 ? v.toLocaleString('es-CO') : v % 1 === 0 ? v.toString() : v.toFixed(1) : v;
const effColor = v => v >= 97 ? '#059669' : v >= 95 ? '#0891b2' : v >= 92 ? '#d97706' : v >= 88 ? '#ea580c' : '#dc2626';
const effBg = v => v >= 97 ? '#ecfdf5' : v >= 95 ? '#ecfeff' : v >= 92 ? '#fffbeb' : v >= 88 ? '#fff7ed' : '#fef2f2';
const heatBg = v => {
  const h = v >= 97 ? 145 : v >= 95 ? 170 : v >= 92 ? 45 : v >= 88 ? 25 : 0;
  const l = Math.min(92, 35 + (v - 60) * 1.4);
  return `hsl(${h},70%,${l}%)`;
};
const CL = {
  green: '#00843D',
  greenDk: '#005C2A',
  greenLt: '#e8f5ee',
  blue: '#003D7A',
  blueLt: '#e8eff8',
  orange: '#F7941D',
  orangeLt: '#fef3e2',
  red: '#C62828',
  redLt: '#fef2f2',
  teal: '#00838F',
  tealLt: '#e0f7fa',
  ink: '#1a2332',
  ink2: '#4a5568',
  ink3: '#94a3b8',
  bg: '#f0f4f0',
  card: '#ffffff',
  brd: '#e2e8e2',
  colYellow: '#FFD100'
};
const Tip = ({
  active,
  payload,
  label
}) => {
  if (!active || !payload?.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: '#fff',
      border: `1px solid ${CL.brd}`,
      borderRadius: 10,
      padding: '10px 14px',
      fontSize: 12,
      boxShadow: '0 4px 16px rgba(0,0,0,.1)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      marginBottom: 4,
      color: CL.ink
    }
  }, label), payload.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      color: p.color || CL.ink2
    }
  }, p.name, ": ", /*#__PURE__*/React.createElement("b", null, typeof p.value === 'number' ? String(p.name).includes('%') || String(p.dataKey).includes('eff') ? p.value.toFixed(1) + '%' : fmt(p.value) : p.value))));
};
const Card = ({
  children,
  style
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    background: CL.card,
    borderRadius: 12,
    border: `1px solid ${CL.brd}`,
    padding: 20,
    boxShadow: '0 1px 3px rgba(0,0,0,.04)',
    ...style
  }
}, children);
const KPI = ({
  label,
  value,
  sub,
  color,
  icon
}) => /*#__PURE__*/React.createElement(Card, {
  style: {
    position: 'relative',
    overflow: 'hidden'
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 4,
    height: '100%',
    background: color,
    borderRadius: '4px 0 0 4px'
  }
}), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 10,
    color: CL.ink3,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    fontWeight: 600,
    marginBottom: 2
  }
}, icon, " ", label), /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 26,
    fontWeight: 800,
    color,
    lineHeight: 1.1
  }
}, value), sub && /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 11,
    color: CL.ink2,
    marginTop: 4
  }
}, sub));
const Tag = ({
  children,
  color,
  bg
}) => /*#__PURE__*/React.createElement("span", {
  style: {
    display: 'inline-block',
    padding: '2px 10px',
    borderRadius: 20,
    fontSize: 11,
    fontWeight: 700,
    background: bg,
    color
  }
}, children);
const Sel = ({
  value,
  onChange,
  options,
  label,
  width
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    display: 'inline-flex',
    flexDirection: 'column',
    gap: 2
  }
}, label && /*#__PURE__*/React.createElement("span", {
  style: {
    fontSize: 9,
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 1,
    color: 'rgba(255,255,255,.5)'
  }
}, label), /*#__PURE__*/React.createElement("select", {
  value: value,
  onChange: e => onChange(e.target.value),
  style: {
    padding: '5px 8px',
    borderRadius: 6,
    border: '1px solid rgba(255,255,255,.2)',
    background: 'rgba(255,255,255,.1)',
    color: '#fff',
    fontSize: 12,
    cursor: 'pointer',
    minWidth: width || 100,
    outline: 'none'
  }
}, options.map(o => /*#__PURE__*/React.createElement("option", {
  key: o.v,
  value: o.v,
  style: {
    color: '#000'
  }
}, o.l))));
const STitle = ({
  icon,
  title,
  sub
}) => /*#__PURE__*/React.createElement("div", {
  style: {
    marginBottom: 16
  }
}, /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 18,
    fontWeight: 700,
    color: CL.ink
  }
}, icon, " ", title), sub && /*#__PURE__*/React.createElement("div", {
  style: {
    fontSize: 12,
    color: CL.ink3,
    marginTop: 2
  }
}, sub));

// ═══ COLOMBIA MAP COMPONENT ═══
const ColombiaMap = ({
  data,
  selectedDept,
  selectedCity
}) => {
  const [hover, setHover] = useState(null);
  const filtered = useMemo(() => {
    let d = data;
    if (selectedDept && selectedDept !== 'TODOS') {
      const cityList = RAW.meta.ciudades_by_dept[selectedDept] || [];
      d = d.filter(c => cityList.includes(c.name));
    }
    if (selectedCity && selectedCity !== 'TODAS') d = d.filter(c => c.name === selectedCity);
    return d;
  }, [data, selectedDept, selectedCity]);
  const maxSvcs = Math.max(...filtered.map(c => c.total), 1);
  const latMin = 1.5,
    latMax = 12.5,
    lonMin = -78,
    lonMax = -71;
  const W = 440,
    H = 500;
  const proj = (lat, lon) => [(lon - lonMin) / (lonMax - lonMin) * W, H - (lat - latMin) / (latMax - latMin) * H];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      width: '100%'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: `0 0 ${W} ${H}`,
    style: {
      width: '100%',
      height: 'auto',
      maxHeight: 480
    }
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("radialGradient", {
    id: "bggrad"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "#e8f5ee"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "#d4edda"
  })), /*#__PURE__*/React.createElement("filter", {
    id: "glow"
  }, /*#__PURE__*/React.createElement("feGaussianBlur", {
    stdDeviation: "3",
    result: "blur"
  }), /*#__PURE__*/React.createElement("feMerge", null, /*#__PURE__*/React.createElement("feMergeNode", {
    in: "blur"
  }), /*#__PURE__*/React.createElement("feMergeNode", {
    in: "SourceGraphic"
  })))), /*#__PURE__*/React.createElement("rect", {
    width: W,
    height: H,
    rx: "12",
    fill: "url(#bggrad)",
    stroke: CL.brd,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("text", {
    x: "10",
    y: "20",
    fontSize: "10",
    fill: CL.ink3,
    fontWeight: "600"
  }, "COLOMBIA"), /*#__PURE__*/React.createElement("path", {
    d: "M180,30 L220,25 L260,35 L300,20 L340,30 L360,50 L380,45 L400,70 L390,100 L370,120 L350,110 L330,130 L340,160 L320,180 L300,170 L280,190 L260,180 L240,200 L230,230 L220,260 L210,290 L200,320 L190,340 L180,360 L170,380 L160,400 L140,410 L120,400 L100,380 L80,360 L70,330 L80,300 L90,270 L100,240 L110,210 L120,180 L130,150 L140,120 L150,90 L160,60 Z",
    fill: "rgba(0,132,61,0.06)",
    stroke: "rgba(0,132,61,0.2)",
    strokeWidth: "1.5"
  }), filtered.map((c, i) => {
    const [x, y] = proj(c.lat, c.lon);
    const r = Math.max(6, Math.min(30, c.total / maxSvcs * 30));
    const opacity = 0.15 + 0.55 * (c.total / maxSvcs);
    const col = effColor(c.eff);
    return /*#__PURE__*/React.createElement("g", {
      key: i,
      onMouseEnter: () => setHover(c),
      onMouseLeave: () => setHover(null),
      style: {
        cursor: 'pointer'
      }
    }, /*#__PURE__*/React.createElement("circle", {
      cx: x,
      cy: y,
      r: r * 1.8,
      fill: col,
      opacity: opacity * 0.3,
      filter: "url(#glow)"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: x,
      cy: y,
      r: r,
      fill: col,
      opacity: opacity,
      stroke: "#fff",
      strokeWidth: "1.5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: x,
      cy: y,
      r: r * 0.3,
      fill: "#fff",
      opacity: "0.6"
    }), c.total > 500 && /*#__PURE__*/React.createElement("text", {
      x: x,
      y: y + r + 12,
      textAnchor: "middle",
      fontSize: "8",
      fill: CL.ink2,
      fontWeight: "600"
    }, c.name));
  })), hover && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 8,
      right: 8,
      background: 'rgba(255,255,255,.97)',
      borderRadius: 10,
      padding: '12px 16px',
      boxShadow: '0 4px 20px rgba(0,0,0,.15)',
      border: `1px solid ${CL.brd}`,
      fontSize: 12,
      minWidth: 180,
      zIndex: 5
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 14,
      color: CL.ink,
      marginBottom: 6
    }
  }, hover.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '4px 12px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: CL.ink3
    }
  }, "Servicios:"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700
    }
  }, fmt(hover.total)), /*#__PURE__*/React.createElement("span", {
    style: {
      color: CL.ink3
    }
  }, "Efectividad:"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: effColor(hover.eff)
    }
  }, hover.eff.toFixed(1), "%"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: CL.ink3
    }
  }, "T. Promedio:"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: 700,
      color: hover.t_prom > 15 ? CL.red : hover.t_prom > 5 ? CL.orange : CL.green
    }
  }, hover.t_prom, "h"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 12,
      justifyContent: 'center',
      marginTop: 8,
      fontSize: 10,
      color: CL.ink3
    }
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 10,
      height: 10,
      borderRadius: 5,
      background: '#059669',
      marginRight: 4,
      verticalAlign: 'middle'
    }
  }), "\u226597%"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 10,
      height: 10,
      borderRadius: 5,
      background: '#0891b2',
      marginRight: 4,
      verticalAlign: 'middle'
    }
  }), "95-97%"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 10,
      height: 10,
      borderRadius: 5,
      background: '#d97706',
      marginRight: 4,
      verticalAlign: 'middle'
    }
  }), "92-95%"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-block',
      width: 10,
      height: 10,
      borderRadius: 5,
      background: '#dc2626',
      marginRight: 4,
      verticalAlign: 'middle'
    }
  }), "<92%"), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 8
    }
  }, "Tama\xF1o = Volumen")));
};
function Dashboard() {
  const [tab, setTab] = useState('gerencial');
  const [dept, setDept] = useState('TODOS');
  const [ciudad, setCiudad] = useState('TODAS');
  const [mes, setMes] = useState('TODOS');
  const [semana, setSemana] = useState('TODAS');
  const [s2Dept, setS2Dept] = useState('TODOS');
  const [s2Ciudad, setS2Ciudad] = useState('TODAS');
  const [espSort, setEspSort] = useState('total');
  const cOpts = useMemo(() => {
    if (dept === 'TODOS') return Object.values(RAW.meta.ciudades_by_dept).flat().sort();
    return RAW.meta.ciudades_by_dept[dept] || [];
  }, [dept]);
  const s2cOpts = useMemo(() => {
    if (s2Dept === 'TODOS') return Object.values(RAW.meta.ciudades_by_dept).flat().sort();
    return RAW.meta.ciudades_by_dept[s2Dept] || [];
  }, [s2Dept]);
  const trendData = useMemo(() => {
    let d = RAW.by_ms;
    if (mes !== 'TODOS') d = d.filter(r => r.mes === mes);
    if (semana !== 'TODAS') d = d.filter(r => r.semana === semana);
    return d.map(r => ({
      ...r,
      eff: pct(r.efectivos, r.total),
      effV1: pct(r.v1_efect, r.v1_total)
    }));
  }, [mes, semana]);
  const kpis = useMemo(() => {
    const t = trendData.reduce((a, r) => ({
      total: a.total + r.total,
      ef: a.ef + r.efectivos,
      ne: a.ne + r.no_efectivos,
      v1t: a.v1t + r.v1_total,
      v1e: a.v1e + r.v1_efect,
      v2t: a.v2t + r.v2_total,
      v2e: a.v2e + r.v2_efect
    }), {
      total: 0,
      ef: 0,
      ne: 0,
      v1t: 0,
      v1e: 0,
      v2t: 0,
      v2e: 0
    });
    return {
      ...t,
      effPct: pct(t.ef, t.total),
      effV1: pct(t.v1e, t.v1t),
      effV2: pct(t.v2e, t.v2t)
    };
  }, [trendData]);
  const fCiudades = useMemo(() => {
    let d = RAW.by_ciudad;
    if (dept !== 'TODOS') d = d.filter(r => r.departamento === dept);
    if (ciudad !== 'TODAS') d = d.filter(r => r.ciudad === ciudad);
    return d.map(r => ({
      ...r,
      eff: pct(r.efectivos, r.total)
    })).sort((a, b) => b.total - a.total);
  }, [dept, ciudad]);
  const fDepts = useMemo(() => {
    let d = RAW.by_dept;
    if (dept !== 'TODOS') d = d.filter(r => r.departamento === dept);
    return d.map(r => ({
      ...r,
      eff: pct(r.efectivos, r.total)
    }));
  }, [dept]);
  const s2Heat = useMemo(() => {
    let d = RAW.by_heatmap;
    if (s2Dept !== 'TODOS') d = d.filter(r => r.departamento === s2Dept);
    if (s2Ciudad !== 'TODAS') d = d.filter(r => r.ciudad === s2Ciudad);
    return d;
  }, [s2Dept, s2Ciudad]);
  const s2Esp = useMemo(() => {
    let d = RAW.by_esp;
    if (s2Dept !== 'TODOS') d = d.filter(r => r.departamento === s2Dept);
    if (s2Ciudad !== 'TODAS') d = d.filter(r => r.ciudad === s2Ciudad);
    return d.map(r => ({
      ...r,
      eff: pct(r.efectivos, r.total),
      effV1: pct(r.v1_efect, r.v1_total),
      effV2: r.v2_total > 0 ? pct(r.v2_efect, r.v2_total) : null
    })).sort((a, b) => espSort === 'eff' ? a.eff - b.eff : b.total - a.total);
  }, [s2Dept, s2Ciudad, espSort]);
  const s3Cities = useMemo(() => RAW.by_ciudad.filter(r => r.total >= 200).map(r => ({
    ...r,
    eff: pct(r.efectivos, r.total),
    effV1: pct(r.v1_efect, r.v1_total),
    effV2: r.v2_total > 0 ? pct(r.v2_efect, r.v2_total) : null
  })).sort((a, b) => b.total - a.total), []);
  const tabs = [{
    id: 'gerencial',
    label: 'Vision Gerencial',
    icon: '📊'
  }, {
    id: 'detalle',
    label: 'Analisis Detallado',
    icon: '🔍'
  }, {
    id: 'versus',
    label: 'Comparativo',
    icon: '⚖'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: CL.bg,
      minHeight: '100vh',
      fontFamily: "'Segoe UI',sans-serif"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      background: `linear-gradient(135deg,${CL.blue} 0%,${CL.green} 100%)`,
      padding: '14px 28px',
      color: '#fff'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      flexWrap: 'wrap',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "Colsubsidio",
    style: {
      height: 36,
      borderRadius: 4
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 20,
      fontWeight: 700
    }
  }, "Dashboard Last Mile \u2014 Operacion Domicilios"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      opacity: .65
    }
  }, fmt(RAW.totals.total), " servicios \xB7 ", RAW.totals.n_ciudades, " ciudades \xB7 ", RAW.totals.n_deptos, " departamentos \xB7 Ene-Mar 2026"))), tab === 'gerencial' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Sel, {
    label: "Departamento",
    value: dept,
    onChange: v => {
      setDept(v);
      setCiudad('TODAS');
    },
    options: [{
      v: 'TODOS',
      l: 'Todos'
    }, ...RAW.meta.departamentos.map(d => ({
      v: d,
      l: d
    }))],
    width: 130
  }), /*#__PURE__*/React.createElement(Sel, {
    label: "Ciudad",
    value: ciudad,
    onChange: setCiudad,
    options: [{
      v: 'TODAS',
      l: 'Todas'
    }, ...cOpts.map(c => ({
      v: c,
      l: c
    }))],
    width: 120
  }), /*#__PURE__*/React.createElement(Sel, {
    label: "Mes",
    value: mes,
    onChange: setMes,
    options: [{
      v: 'TODOS',
      l: 'Todos'
    }, ...RAW.meta.meses.map(m => ({
      v: m,
      l: m
    }))],
    width: 95
  }), /*#__PURE__*/React.createElement(Sel, {
    label: "Semana",
    value: semana,
    onChange: setSemana,
    options: [{
      v: 'TODAS',
      l: 'Todas'
    }, ...RAW.meta.semanas.map(s => ({
      v: s,
      l: s
    }))],
    width: 100
  })), tab === 'detalle' && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      flexWrap: 'wrap',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Sel, {
    label: "Departamento",
    value: s2Dept,
    onChange: v => {
      setS2Dept(v);
      setS2Ciudad('TODAS');
    },
    options: [{
      v: 'TODOS',
      l: 'Todos'
    }, ...RAW.meta.departamentos.map(d => ({
      v: d,
      l: d
    }))],
    width: 130
  }), /*#__PURE__*/React.createElement(Sel, {
    label: "Ciudad",
    value: s2Ciudad,
    onChange: setS2Ciudad,
    options: [{
      v: 'TODAS',
      l: 'Todas'
    }, ...s2cOpts.map(c => ({
      v: c,
      l: c
    }))],
    width: 120
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: CL.card,
      borderBottom: `1px solid ${CL.brd}`,
      position: 'sticky',
      top: 0,
      zIndex: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      maxWidth: 1280,
      margin: '0 auto',
      padding: '0 28px'
    }
  }, tabs.map(t => /*#__PURE__*/React.createElement("button", {
    key: t.id,
    onClick: () => setTab(t.id),
    style: {
      padding: '12px 18px',
      fontSize: 13,
      fontWeight: tab === t.id ? 700 : 500,
      color: tab === t.id ? CL.green : CL.ink3,
      background: 'transparent',
      border: 'none',
      borderBottom: `3px solid ${tab === t.id ? CL.green : 'transparent'}`,
      cursor: 'pointer'
    }
  }, t.icon, " ", t.label)))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: '0 auto',
      padding: '20px 28px'
    }
  }, tab === 'gerencial' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit,minmax(175px,1fr))',
      gap: 10,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    label: "Efectividad Total",
    value: kpis.effPct.toFixed(1) + '%',
    sub: `${fmt(kpis.ef)} de ${fmt(kpis.total)}`,
    color: effColor(kpis.effPct),
    icon: "\u2705"
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Total Servicios",
    value: fmt(kpis.total),
    sub: `${fmt(kpis.ne)} no efectivos`,
    color: CL.blue,
    icon: "\uD83D\uDCE6"
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Efectividad V1",
    value: kpis.effV1.toFixed(1) + '%',
    sub: `${fmt(kpis.v1e)} de ${fmt(kpis.v1t)}`,
    color: CL.teal,
    icon: "\uD83C\uDFCD"
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Efectividad V2",
    value: kpis.v2t > 0 ? kpis.effV2.toFixed(1) + '%' : 'N/A',
    sub: `${fmt(kpis.v2e)} de ${fmt(kpis.v2t)} reprocesos`,
    color: CL.red,
    icon: "\uD83D\uDD04"
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "Tiempo Promedio",
    value: RAW.totals.t_prom + 'h',
    sub: "Creacion \u2192 Aceptacion",
    color: CL.orange,
    icon: "\u23F1"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(STitle, {
    icon: "\uD83D\uDCC8",
    title: "Tendencia de Efectividad",
    sub: "% Efectividad Total y V1 por semana"
  }), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 240
  }, /*#__PURE__*/React.createElement(ComposedChart, {
    data: trendData
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: CL.brd
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "label",
    tick: {
      fontSize: 10
    }
  }), /*#__PURE__*/React.createElement(YAxis, {
    domain: [92, 100],
    tick: {
      fontSize: 10
    },
    tickFormatter: v => v + '%'
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: /*#__PURE__*/React.createElement(Tip, null)
  }), /*#__PURE__*/React.createElement(Legend, {
    wrapperStyle: {
      fontSize: 11
    }
  }), /*#__PURE__*/React.createElement(Area, {
    dataKey: "eff",
    name: "% Efectividad",
    fill: CL.greenLt,
    stroke: CL.green,
    strokeWidth: 2.5,
    dot: {
      r: 4,
      fill: CL.green
    }
  }), /*#__PURE__*/React.createElement(Line, {
    dataKey: "effV1",
    name: "% V1",
    stroke: CL.teal,
    strokeWidth: 2,
    strokeDasharray: "4 2",
    dot: {
      r: 3
    }
  })))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(STitle, {
    icon: "\uD83D\uDCE6",
    title: "Volumen de Servicios",
    sub: "Efectivos vs No Efectivos por semana"
  }), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 240
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: trendData
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: CL.brd
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "label",
    tick: {
      fontSize: 10
    }
  }), /*#__PURE__*/React.createElement(YAxis, {
    tick: {
      fontSize: 10
    }
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: /*#__PURE__*/React.createElement(Tip, null)
  }), /*#__PURE__*/React.createElement(Legend, {
    wrapperStyle: {
      fontSize: 11
    }
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "efectivos",
    name: "Efectivos",
    stackId: "a",
    fill: CL.green,
    barSize: 22
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "no_efectivos",
    name: "No Efectivos",
    stackId: "a",
    fill: CL.red,
    radius: [3, 3, 0, 0],
    barSize: 22
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(STitle, {
    icon: "\uD83D\uDDFA",
    title: "Mapa de Calor Geografico",
    sub: "Concentracion de servicios \u2014 Color = Efectividad, Tamano = Volumen"
  }), /*#__PURE__*/React.createElement(ColombiaMap, {
    data: MAP_CITIES,
    selectedDept: dept,
    selectedCity: ciudad
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(STitle, {
    icon: "\uD83D\uDCCD",
    title: "Por Departamento"
  }), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: Math.max(200, fDepts.length * 28)
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: fDepts,
    layout: "vertical"
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: CL.brd
  }), /*#__PURE__*/React.createElement(XAxis, {
    type: "number",
    domain: [80, 101],
    tick: {
      fontSize: 10
    },
    tickFormatter: v => v + '%'
  }), /*#__PURE__*/React.createElement(YAxis, {
    dataKey: "departamento",
    type: "category",
    tick: {
      fontSize: 8
    },
    width: 105
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: /*#__PURE__*/React.createElement(Tip, null)
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "eff",
    name: "% Efectividad",
    radius: [0, 4, 4, 0],
    barSize: 13
  }, fDepts.map((d, i) => /*#__PURE__*/React.createElement(Cell, {
    key: i,
    fill: effColor(d.eff)
  })))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(STitle, {
    icon: "\uD83C\uDFD9",
    title: "Por Ciudad",
    sub: dept !== 'TODOS' ? `Filtrado: ${dept}` : 'Top por volumen'
  }), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: Math.max(200, Math.min(fCiudades.length, 12) * 24)
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: fCiudades.slice(0, 12),
    layout: "vertical"
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: CL.brd
  }), /*#__PURE__*/React.createElement(XAxis, {
    type: "number",
    domain: [70, 101],
    tick: {
      fontSize: 10
    },
    tickFormatter: v => v + '%'
  }), /*#__PURE__*/React.createElement(YAxis, {
    dataKey: "ciudad",
    type: "category",
    tick: {
      fontSize: 8
    },
    width: 85
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: /*#__PURE__*/React.createElement(Tip, null)
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "eff",
    name: "% Efectividad",
    radius: [0, 4, 4, 0],
    barSize: 13
  }, fCiudades.slice(0, 12).map((d, i) => /*#__PURE__*/React.createElement(Cell, {
    key: i,
    fill: effColor(d.eff)
  })))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '2fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(STitle, {
    icon: "\uD83C\uDFF7",
    title: "Por Tipo de Servicio",
    sub: "Participacion, cantidad y efectividad"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: `2px solid ${CL.brd}`
    }
  }, ['Tipo Servicio', 'Cantidad', 'Part.', '% Efect.', '% V1', 'T.Prom(h)'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      padding: '8px 10px',
      textAlign: h === 'Tipo Servicio' ? 'left' : 'center',
      fontSize: 10,
      color: CL.ink3,
      textTransform: 'uppercase'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, RAW.by_ts.filter(r => r.total >= 50).map(r => {
    const e = pct(r.efectivos, r.total);
    return /*#__PURE__*/React.createElement("tr", {
      key: r.tipo_servicio,
      style: {
        borderBottom: `1px solid ${CL.brd}`
      }
    }, /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '8px 10px',
        fontWeight: 600
      }
    }, r.tipo_servicio), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '8px 10px',
        textAlign: 'center'
      }
    }, fmt(r.total)), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '8px 10px',
        textAlign: 'center'
      }
    }, pct(r.total, RAW.totals.total).toFixed(1), "%"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '8px 10px',
        textAlign: 'center'
      }
    }, /*#__PURE__*/React.createElement(Tag, {
      color: effColor(e),
      bg: effBg(e)
    }, e.toFixed(1), "%")), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '8px 10px',
        textAlign: 'center'
      }
    }, pct(r.v1_efect, r.v1_total).toFixed(1), "%"), /*#__PURE__*/React.createElement("td", {
      style: {
        padding: '8px 10px',
        textAlign: 'center',
        color: r.t_prom > 15 ? CL.red : r.t_prom > 5 ? CL.orange : CL.ink2
      }
    }, r.t_prom != null ? r.t_prom + 'h' : '—'));
  }))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(STitle, {
    icon: "\uD83D\uDCCA",
    title: "Canal (Grupo)",
    sub: "Distribucion"
  }), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 190
  }, /*#__PURE__*/React.createElement(PieChart, null, /*#__PURE__*/React.createElement(Pie, {
    data: RAW.by_tsg.map(r => ({
      name: r.tipo_servicio_grupo.trim(),
      value: r.total
    })),
    cx: "50%",
    cy: "50%",
    innerRadius: 40,
    outerRadius: 75,
    paddingAngle: 3,
    dataKey: "value",
    label: ({
      name,
      percent
    }) => `${name} ${(percent * 100).toFixed(0)}%`,
    labelLine: false
  }, /*#__PURE__*/React.createElement(Cell, {
    fill: CL.blue
  }), /*#__PURE__*/React.createElement(Cell, {
    fill: CL.green
  }), /*#__PURE__*/React.createElement(Cell, {
    fill: CL.orange
  })), /*#__PURE__*/React.createElement(Tooltip, null))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 6,
      marginTop: 6
    }
  }, RAW.by_tsg.map((r, i) => {
    const e = pct(r.efectivos, r.total);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        textAlign: 'center',
        padding: 6,
        background: effBg(e),
        borderRadius: 8
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15,
        fontWeight: 800,
        color: effColor(e)
      }
    }, e.toFixed(1), "%"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: CL.ink3
      }
    }, r.tipo_servicio_grupo.trim()));
  }))))), tab === 'detalle' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2,1fr)',
      gap: 12,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(KPI, {
    label: "Tiempo Promedio Creacion \u2192 Aceptacion",
    value: RAW.totals.t_prom + 'h',
    sub: "Promedio general de toda la operacion",
    color: CL.blue,
    icon: "\u23F1"
  }), /*#__PURE__*/React.createElement(KPI, {
    label: "No Efectivos Totales",
    value: fmt(RAW.totals.no_efectivos),
    sub: `${pct(RAW.totals.no_efectivos, RAW.totals.total).toFixed(1)}% del total de servicios`,
    color: CL.red,
    icon: "\u26A0"
  })), /*#__PURE__*/React.createElement(Card, {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(STitle, {
    icon: "\uD83D\uDD25",
    title: "Mapa de Calor: PdV x Ciudad",
    sub: "Especialidades ordenadas por efectividad (menor a mayor) \u2014 solo con 30+ servicios"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto',
      maxHeight: 450,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'separate',
      borderSpacing: 2,
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("thead", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: CL.bg
    }
  }, ['Punto de Venta', 'Ciudad', 'Depto', 'Svcs', '% Efect.', 'T.Prom(h)'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      padding: '8px 10px',
      textAlign: h === 'Punto de Venta' ? 'left' : 'center',
      fontSize: 10,
      color: CL.ink3,
      textTransform: 'uppercase',
      background: CL.bg
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, s2Heat.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 10px',
      fontWeight: 600,
      maxWidth: 280,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, r.especialidad), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 10px',
      textAlign: 'center',
      color: CL.ink2
    }
  }, r.ciudad), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 10px',
      textAlign: 'center',
      color: CL.ink3,
      fontSize: 10
    }
  }, r.departamento), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 10px',
      textAlign: 'center'
    }
  }, r.total), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 10px',
      textAlign: 'center',
      borderRadius: 6,
      fontWeight: 700,
      background: heatBg(r.eff),
      color: r.eff < 85 ? '#fff' : CL.ink
    }
  }, r.eff.toFixed(1), "%"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 10px',
      textAlign: 'center',
      color: r.t_prom > 20 ? CL.red : r.t_prom > 10 ? CL.orange : CL.ink2
    }
  }, r.t_prom != null ? r.t_prom + 'h' : '—'))))))), /*#__PURE__*/React.createElement(Card, {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement(STitle, {
    icon: "\uD83C\uDFEA",
    title: "Detalle por Punto de Venta",
    sub: "Metricas completas por especialidad"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setEspSort('total'),
    style: {
      padding: '4px 10px',
      borderRadius: 6,
      border: `1px solid ${CL.brd}`,
      background: espSort === 'total' ? CL.green : CL.card,
      color: espSort === 'total' ? '#fff' : CL.ink2,
      fontSize: 11,
      cursor: 'pointer',
      fontWeight: 600
    }
  }, "Por Volumen"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setEspSort('eff'),
    style: {
      padding: '4px 10px',
      borderRadius: 6,
      border: `1px solid ${CL.brd}`,
      background: espSort === 'eff' ? CL.red : CL.card,
      color: espSort === 'eff' ? '#fff' : CL.ink2,
      fontSize: 11,
      cursor: 'pointer',
      fontWeight: 600
    }
  }, "Por Riesgo"))), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto',
      maxHeight: 420,
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("thead", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 1
    }
  }, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: CL.bg,
      borderBottom: `2px solid ${CL.brd}`
    }
  }, ['Especialidad', 'Ciudad', 'Total', 'Efect.', 'No Ef.', '%Efect.', '%V1', 'V2', '%V2', 'T.Prom(h)'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      padding: '7px 6px',
      textAlign: h === 'Especialidad' ? 'left' : 'center',
      fontSize: 9,
      color: CL.ink3,
      textTransform: 'uppercase',
      background: CL.bg,
      whiteSpace: 'nowrap'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, s2Esp.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderBottom: `1px solid ${CL.brd}`,
      background: r.eff < 90 ? CL.redLt : 'transparent'
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 6px',
      fontWeight: 600,
      maxWidth: 230,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, r.especialidad), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 6px',
      textAlign: 'center',
      color: CL.ink2,
      fontSize: 10
    }
  }, r.ciudad), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 6px',
      textAlign: 'center',
      fontWeight: 700
    }
  }, r.total), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 6px',
      textAlign: 'center',
      color: CL.green
    }
  }, r.efectivos), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 6px',
      textAlign: 'center',
      color: CL.red,
      fontWeight: 600
    }
  }, r.no_efectivos), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 6px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    color: effColor(r.eff),
    bg: effBg(r.eff)
  }, r.eff.toFixed(1), "%")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 6px',
      textAlign: 'center'
    }
  }, r.effV1.toFixed(1), "%"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 6px',
      textAlign: 'center'
    }
  }, r.v2_total), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 6px',
      textAlign: 'center',
      color: r.effV2 != null && r.effV2 < 50 ? CL.red : CL.ink2
    }
  }, r.effV2 != null ? r.effV2.toFixed(0) + '%' : '—'), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '6px 6px',
      textAlign: 'center',
      color: r.t_prom > 20 ? CL.red : r.t_prom > 5 ? CL.orange : CL.ink2
    }
  }, r.t_prom != null ? r.t_prom + 'h' : '—'))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(STitle, {
    icon: "\uD83D\uDCCB",
    title: "Novedades (Fallos)",
    sub: "Top motivos de no efectividad"
  }), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 270
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: RAW.by_nov,
    layout: "vertical"
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: CL.brd
  }), /*#__PURE__*/React.createElement(XAxis, {
    type: "number",
    tick: {
      fontSize: 10
    }
  }), /*#__PURE__*/React.createElement(YAxis, {
    dataKey: "novedad",
    type: "category",
    tick: {
      fontSize: 8
    },
    width: 150
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: /*#__PURE__*/React.createElement(Tip, null)
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "count",
    name: "Fallos",
    radius: [0, 4, 4, 0],
    barSize: 14
  }, RAW.by_nov.map((d, i) => /*#__PURE__*/React.createElement(Cell, {
    key: i,
    fill: d.cluster === 'AUSENCIA' ? CL.orange : d.cluster === 'DIRECCION' ? CL.blue : d.cluster === 'RECHAZO' ? CL.red : d.cluster === 'OPERATIVO' ? '#7c3aed' : CL.teal
  })))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(STitle, {
    icon: "\u23F3",
    title: "Tiempo Promedio por Ciudad",
    sub: "Creacion \u2192 Aceptacion (horas)"
  }), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 270
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: RAW.by_ciudad.filter(r => r.total >= 200 && r.t_prom != null).sort((a, b) => b.t_prom - a.t_prom).slice(0, 12),
    layout: "vertical"
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: CL.brd
  }), /*#__PURE__*/React.createElement(XAxis, {
    type: "number",
    tick: {
      fontSize: 10
    },
    tickFormatter: v => v + 'h'
  }), /*#__PURE__*/React.createElement(YAxis, {
    dataKey: "ciudad",
    type: "category",
    tick: {
      fontSize: 9
    },
    width: 90
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: /*#__PURE__*/React.createElement(Tip, null)
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "t_prom",
    name: "Promedio(hrs)",
    radius: [0, 4, 4, 0],
    barSize: 14
  }, RAW.by_ciudad.filter(r => r.total >= 200 && r.t_prom != null).sort((a, b) => b.t_prom - a.t_prom).slice(0, 12).map((d, i) => /*#__PURE__*/React.createElement(Cell, {
    key: i,
    fill: d.t_prom > 15 ? CL.red : d.t_prom > 5 ? CL.orange : CL.green
  })))))))), tab === 'versus' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Card, {
    style: {
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(STitle, {
    icon: "\u2696",
    title: "Comparativo General por Ciudad",
    sub: "Todas las metricas \u2014 min. 200 servicios \u2014 Tiempo = Promedio Creacion a Aceptacion"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 11
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      background: CL.bg,
      borderBottom: `2px solid ${CL.brd}`
    }
  }, ['Ciudad', 'Depto', 'Svcs', 'Efect.', 'No Ef.', '%Efect.', '%V1', 'V2', '%V2', 'T.Prom(h)'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      padding: '8px 6px',
      textAlign: h === 'Ciudad' || h === 'Depto' ? 'left' : 'center',
      fontSize: 9,
      color: CL.ink3,
      textTransform: 'uppercase',
      whiteSpace: 'nowrap'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, s3Cities.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderBottom: `1px solid ${CL.brd}`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '7px 6px',
      fontWeight: 700
    }
  }, r.ciudad), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '7px 6px',
      color: CL.ink3,
      fontSize: 10
    }
  }, r.departamento), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '7px 6px',
      textAlign: 'center',
      fontWeight: 600
    }
  }, fmt(r.total)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '7px 6px',
      textAlign: 'center',
      color: CL.green
    }
  }, fmt(r.efectivos)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '7px 6px',
      textAlign: 'center',
      color: CL.red,
      fontWeight: 600
    }
  }, r.no_efectivos), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '7px 6px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    color: effColor(r.eff),
    bg: effBg(r.eff)
  }, r.eff.toFixed(1), "%")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '7px 6px',
      textAlign: 'center'
    }
  }, r.effV1.toFixed(1), "%"), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '7px 6px',
      textAlign: 'center'
    }
  }, r.v2_total), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '7px 6px',
      textAlign: 'center',
      color: r.effV2 != null && r.effV2 < 50 ? CL.red : CL.ink2
    }
  }, r.effV2 != null ? r.effV2.toFixed(0) + '%' : '—'), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '7px 6px',
      textAlign: 'center',
      color: r.t_prom > 15 ? CL.red : r.t_prom > 5 ? CL.orange : CL.ink2
    }
  }, r.t_prom || '—'))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16,
      marginBottom: 20
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(STitle, {
    icon: "\uD83D\uDCCA",
    title: "Efectividad por Ciudad",
    sub: "Top 15"
  }), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 340
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: s3Cities.slice(0, 15)
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: CL.brd
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "ciudad",
    tick: {
      fontSize: 8
    },
    angle: -35,
    textAnchor: "end",
    height: 55
  }), /*#__PURE__*/React.createElement(YAxis, {
    domain: [80, 101],
    tick: {
      fontSize: 10
    },
    tickFormatter: v => v + '%'
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: /*#__PURE__*/React.createElement(Tip, null)
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "eff",
    name: "% Efectividad",
    radius: [4, 4, 0, 0],
    barSize: 20
  }, s3Cities.slice(0, 15).map((d, i) => /*#__PURE__*/React.createElement(Cell, {
    key: i,
    fill: effColor(d.eff)
  })))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(STitle, {
    icon: "\uD83C\uDFF7",
    title: "Por Tipo de Servicio",
    sub: "Cantidad y efectividad"
  }), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 340
  }, /*#__PURE__*/React.createElement(ComposedChart, {
    data: RAW.by_ts.filter(r => r.total >= 100).map(r => ({
      ...r,
      eff: pct(r.efectivos, r.total)
    }))
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: CL.brd
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "tipo_servicio",
    tick: {
      fontSize: 7
    },
    angle: -30,
    textAnchor: "end",
    height: 60
  }), /*#__PURE__*/React.createElement(YAxis, {
    yAxisId: "left",
    tick: {
      fontSize: 10
    }
  }), /*#__PURE__*/React.createElement(YAxis, {
    yAxisId: "right",
    orientation: "right",
    domain: [80, 101],
    tick: {
      fontSize: 10
    },
    tickFormatter: v => v + '%'
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: /*#__PURE__*/React.createElement(Tip, null)
  }), /*#__PURE__*/React.createElement(Legend, {
    wrapperStyle: {
      fontSize: 10
    }
  }), /*#__PURE__*/React.createElement(Bar, {
    yAxisId: "left",
    dataKey: "total",
    name: "Cantidad",
    fill: CL.blueLt,
    radius: [3, 3, 0, 0],
    barSize: 16
  }), /*#__PURE__*/React.createElement(Line, {
    yAxisId: "right",
    dataKey: "eff",
    name: "%Efect.",
    stroke: CL.green,
    strokeWidth: 2.5,
    dot: {
      r: 4,
      fill: CL.green
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(STitle, {
    icon: "\uD83D\uDD04",
    title: "V1 vs V2 por Ciudad",
    sub: "Solo ciudades con reprocesos"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      overflowX: 'auto'
    }
  }, /*#__PURE__*/React.createElement("table", {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      fontSize: 12
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    style: {
      borderBottom: `2px solid ${CL.brd}`
    }
  }, ['Ciudad', 'Svcs V1', '%V1', 'Svcs V2', '%V2'].map(h => /*#__PURE__*/React.createElement("th", {
    key: h,
    style: {
      padding: '8px 10px',
      textAlign: h === 'Ciudad' ? 'left' : 'center',
      fontSize: 10,
      color: CL.ink3,
      textTransform: 'uppercase'
    }
  }, h)))), /*#__PURE__*/React.createElement("tbody", null, s3Cities.filter(r => r.v2_total > 0).map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i,
    style: {
      borderBottom: `1px solid ${CL.brd}`
    }
  }, /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '7px 10px',
      fontWeight: 700
    }
  }, r.ciudad), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '7px 10px',
      textAlign: 'center'
    }
  }, fmt(r.v1_total)), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '7px 10px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    color: effColor(r.effV1),
    bg: effBg(r.effV1)
  }, r.effV1.toFixed(1), "%")), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '7px 10px',
      textAlign: 'center'
    }
  }, r.v2_total), /*#__PURE__*/React.createElement("td", {
    style: {
      padding: '7px 10px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement(Tag, {
    color: r.effV2 != null && r.effV2 < 50 ? CL.red : CL.orange,
    bg: r.effV2 != null && r.effV2 < 50 ? CL.redLt : CL.orangeLt
  }, r.effV2 != null ? r.effV2.toFixed(0) + '%' : '—')))))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(STitle, {
    icon: "\u23F1",
    title: "Tiempo Promedio por Ciudad",
    sub: "Creacion \u2192 Aceptacion (horas)"
  }), /*#__PURE__*/React.createElement(ResponsiveContainer, {
    width: "100%",
    height: 300
  }, /*#__PURE__*/React.createElement(BarChart, {
    data: [...s3Cities].filter(r => r.t_prom != null).sort((a, b) => b.t_prom - a.t_prom).slice(0, 12)
  }, /*#__PURE__*/React.createElement(CartesianGrid, {
    strokeDasharray: "3 3",
    stroke: CL.brd
  }), /*#__PURE__*/React.createElement(XAxis, {
    dataKey: "ciudad",
    tick: {
      fontSize: 8
    },
    angle: -30,
    textAnchor: "end",
    height: 50
  }), /*#__PURE__*/React.createElement(YAxis, {
    tick: {
      fontSize: 10
    },
    tickFormatter: v => v + 'h'
  }), /*#__PURE__*/React.createElement(Tooltip, {
    content: /*#__PURE__*/React.createElement(Tip, null)
  }), /*#__PURE__*/React.createElement(Bar, {
    dataKey: "t_prom",
    name: "Promedio(h)",
    radius: [4, 4, 0, 0],
    barSize: 18
  }, [...s3Cities].filter(r => r.t_prom != null).sort((a, b) => b.t_prom - a.t_prom).slice(0, 12).map((d, i) => /*#__PURE__*/React.createElement(Cell, {
    key: i,
    fill: d.t_prom > 15 ? CL.red : d.t_prom > 5 ? CL.orange : CL.green
  }))))))))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      padding: '16px 28px',
      fontSize: 10,
      color: CL.ink3,
      borderTop: `1px solid ${CL.brd}`,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: LOGO,
    alt: "Colsubsidio",
    style: {
      height: 20,
      marginRight: 8,
      verticalAlign: 'middle',
      opacity: 0.7
    }
  }), "Droguerias Colsubsidio x Quick Help SAS \xB7 Dashboard Last Mile \xB7 Ene-Mar 2026"));
}
ReactDOM.createRoot(document.getElementById('colsubsidio-root')).render(/*#__PURE__*/React.createElement(Dashboard, null));
