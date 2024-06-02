FROM golang:alpine3.20 AS build

WORKDIR /app

COPY fullcycle.go .

RUN go build fullcycle.go

FROM scratch AS prod

WORKDIR /app

COPY --from=build /app/fullcycle .

ENTRYPOINT [ "/app/fullcycle" ] 
