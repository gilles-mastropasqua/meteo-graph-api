# meteo-graph-api

Welcome to the **Meteo-graph-api** project! This GraphQL API provides access to meteorological data from
Météo-France observation stations. It is designed to process and serve structured meteorological data collected from
official sources.

This project is intended to work alongside the
**[meteo-graph-collector](https://github.com/gilles-mastropasqua/meteo-graph-collector)**, which retrieves raw
meteorological data from external sources and prepares it for use within this API.

## Purpose of this API

The **Météo-France GraphQL API** is designed to structure and expose meteorological data collected from the dataset:

🔗 **[Base Climatologique - Données Horaires](https://meteo.data.gouv.fr/datasets/6569b4473bedf2e7abad3b72)**

This dataset includes hourly meteorological observations from Météo-France stations, providing information such as:

- 🌡️ **Temperature**
- 💧 **Humidity**
- 🌬️ **Wind Speed & Direction**
- 🌦️ **Precipitation Levels**
- ⚡ **Atmospheric Pressure**
- 🌤️ **Cloud Cover**
- 🌅 **Solar Radiation**
- ❄️ **Snow Depth**
- 📍 **Geographical Location & Altitude...**
- ⏳ **Historical data available since 1850 for some stations**

The API ensures that data is structured, accessible, and queryable using GraphQL, making it easy to integrate into
applications needing historical meteorological data. The dataset is updated once per day at **07:00 UTC**,
ensuring the latest observations are available for analysis.

![Graphql meteo-france api](https://3w-creation.net/demo-graphql-api)

## Prerequisites

- **Node.js**: Ensure you have [Node.js](https://nodejs.org/) installed.
- **npm**: Comes with Node.js. Verify with `npm -v`.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/gilles-mastropasqua/METEO-FRANCE-GRAPHQL-API.git
   cd METEO-FRANCE-GRAPHQL-API
   ```

2. **Install dependencies**:

   Due to an incompatibility between `pothos` and `prisma` version 6, use the `--legacy-peer-deps` flag:

   ```bash
   npm install --legacy-peer-deps
   ```

## Configuration

1. **Environment Variables**:

    - Duplicate `example.env` and rename it to `.env`:

      ```bash
      cp example.env .env
      ```

    - Open `.env` and configure the necessary variables.

2. **Prisma Setup**:

    - **Generate the Prisma client**:

      ```bash
      npx prisma generate
      ```

    - **Apply database migrations**:

      ```bash
      npx prisma migrate deploy
      ```

## Running the Server

- **Development mode** (with auto-reloading):

  ```bash
  npm run dev
  ```

- **Production mode**:

    1. **Build the project**:

       ```bash
       npm run build
       ```

    2. **Start the server**:

       ```bash
       npm start
       ```

## Usage

Once the server is running, access the GraphiQL interface at:

```
http://localhost:4000
```

This interface allows you to explore and test available GraphQL queries.

## License

For details, see the [LICENSE](LICENSE) file.

## Additional Resources

- **Pothos Documentation**:
  [https://pothos-graphql.dev/docs/plugins/prisma](https://pothos-graphql.dev/docs/plugins/prisma)
- **Prisma Documentation**: [https://www.prisma.io/docs](https://www.prisma.io/docs)

If you have any suggestions or improvements for the project, feel free to **contact me** or submit a pull request on
GitHub.

Feel free to check these resources to enhance your understanding and make the most of this API.

