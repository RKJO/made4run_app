FROM node:10-alpine

RUN apk add --no-cache python python-dev python3 python3-dev \
    linux-headers build-base bash git ca-certificates && \
    python3 -m ensurepip && \
    rm -r /usr/lib/python*/ensurepip && \
    pip3 install --upgrade pip setuptools && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
    rm -r /root/.cache

RUN apk add --no-cache tzdata && \
    cp  /usr/share/zoneinfo/Europe/Warsaw /etc/localtime && \
    echo "Europe/Warsaw" > /etc/timezone

RUN mkdir /app
WORKDIR /app
COPY . /app
RUN pip install -r /backend/src/requirements.txt

RUN cd frontend/gui
RUN npm installd