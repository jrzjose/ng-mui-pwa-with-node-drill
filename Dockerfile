FROM node:20.19.3-alpine3.21

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

RUN mkdir /workspace && \
   mkdir /workspace/ng-t &&  \
   mkdir /workspace/ng-t/node_modules &&  \
   mkdir /workspace/ng-t/node_modules/.cache && \
   chown -R node:node /workspace/ng-t/node_modules/.cache

WORKDIR /workspace/ng-t

COPY . /workspace

EXPOSE 8085
# RUN npm install --save-dev @angular-devkit/build-angular && \
RUN npm install -g @angular/cli

RUN npm install

# CMD ["ng", "serve", "--host", "0.0.0.0"]

#ENTRYPOINT ["start.sh"]
#ENTRYPOINT ["exec", "tail", "-f", "/dev/null"]
