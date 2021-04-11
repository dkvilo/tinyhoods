FROM golang:1.14 as builder

ENV APP_USER app
ENV APP_HOME /go/src/loggerboi

RUN groupadd $APP_USER && useradd -m -g $APP_USER -l $APP_USER
RUN mkdir -p $APP_HOME && chown -R $APP_USER:$APP_USER $APP_HOME

WORKDIR $APP_HOME
# USER $APP_USER
COPY ./ .

RUN go build -o loggerboi

FROM debian:buster

ENV APP_USER app
ENV APP_HOME /go/src/loggerboi

RUN groupadd $APP_USER && useradd -m -g $APP_USER -l $APP_USER
RUN mkdir -p $APP_HOME
WORKDIR $APP_HOME

COPY --chown=0:0 --from=builder $APP_HOME/loggerboi $APP_HOME

EXPOSE 4343
CMD ["./loggerboi", "--port", ":4343"]