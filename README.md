
  # Zago

  This is a code bundle for Zago. The original project is available at https://www.figma.com/design/I8folG7Vr5a03cDaCO8H5M/Zago.

  ## Running the code

Run `npm i` to install the dependencies.

Run `npm run dev` to start the development server.

## Deploying to GitHub Pages

1. Push your changes to the `main` branch (or trigger the workflow manually from the *Actions* tab).
2. Ensure GitHub Pages is set to use the “GitHub Actions” source in **Settings → Pages**.
3. The workflow at `.github/workflows/deploy.yml` will build the app (`npm run build`) and publish the `build/` folder automatically. The live URL appears in the workflow summary once the `Deploy to GitHub Pages` job finishes.
