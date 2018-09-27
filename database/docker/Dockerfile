FROM mariadb:10.2.12

RUN apt-get update && \
    rm -rf /var/cache/apt/lists/*

COPY ./setup.sh /tmp
COPY ./src/. /tmp

RUN chmod a+x /tmp/setup.sh
RUN ln -s /tmp/setup.sh /usr/local/bin/setup.sh

COPY ./docker/my.cnf /etc/mysql/conf.d

COPY ./docker/run.sh /docker-entrypoint-initdb.d

RUN ["chmod", "a+x", "/tmp/setup.sh"]

EXPOSE 3306