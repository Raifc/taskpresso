
FROM node:14 AS react-build

WORKDIR /app/client

COPY client/package.json client/package-lock.json ./
RUN npm install

COPY client/ ./
RUN npm run build

FROM ruby:3.2.2

RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

WORKDIR /app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

COPY --from=react-build /app/client/build/ /app/public/

EXPOSE 3000

ENV RAILS_ENV=production
ENV RAILS_SERVE_STATIC_FILES=true

CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000"]
