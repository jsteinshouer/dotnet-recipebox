FROM mcr.microsoft.com/dotnet/sdk:8.0 AS backend-build
WORKDIR /src
COPY backend/RecipeBox.csproj .
RUN dotnet restore
COPY ./backend .
RUN dotnet publish -c release -o /app

FROM node:alpine AS ui-build
# FROM mcr.microsoft.com/devcontainers/javascript-node:20 AS ui-build
WORKDIR /app

# Install dependencies first to leverage Docker cache
COPY ui/package.json ui/package-lock.json ./

# Using cache mount for npm install, so unchanged packages aren’t downloaded every time
# RUN --mount=type=cache,target=/root/.npm \
#     npm install -g @angular/cli \
#     npm install
RUN npm install -g @angular/cli \
    npm install

COPY ui /app
RUN npm run build

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=backend-build /app .
COPY --from=ui-build /app/dist/browser ./Public
ENTRYPOINT ["dotnet", "RecipeBox.dll"]
