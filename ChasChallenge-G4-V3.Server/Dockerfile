FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY . .
RUN dotnet restore "./ChasChallenge-G4-V3.Server/ChasChallenge-G4-V3.Server.csproj"
RUN dotnet build "./ChasChallenge-G4-V3.Server/ChasChallenge-G4-V3.Server.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "./ChasChallenge-G4-V3.Server/ChasChallenge-G4-V3.Server.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ChasChallenge-G4-V3.Server.dll"]
