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


## Inicializar Base de datos
```
cd .\license\
```
```
npx prisma migrate dev
```

```
npx prisma generate
```
```
npm run seed
```