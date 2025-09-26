# CONTRACT TESTING
Este un ejemplo básico de configuración para realizar Contract Testing.

---

## Requerimientos:
- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)


## Levantar microservicios
Para comenzar levantamos los contenedores de los microservicios:
- Insurance
- Licenses
- Patients
- db

WINDOWS:
```
.\.startall.bat
```

LINUX/MAC:
```
.\.mc-startall.sh
```

copiar y renombrar .env.example a .env

## Inicializar Base de datos
```bash
cd .\licenses\
```


```bash
npm i
```

```bash
npx prisma migrate dev
```

```bash
npx prisma generate
```
```bash
npm run seed
```

```bash
cd ..
```

## Testing

```bash
docker compose run --rm --build consumer-tests test
```

## Verify

```bash
docker compose run --rm verify-licenses
```


## Desafíos

En general la creación de el backend no genero mayor complicación dado que no presenta ningún desafió técnico, no obstante, los obstáculos nacen al momento de vincular el sistema a PACT, luego de comprender su estructura básica y vinculación con proyectos TypeScript el desarrollo continuo sin problemas.