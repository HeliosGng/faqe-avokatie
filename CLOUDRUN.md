# Deploying to Google Cloud Run with GitHub Actions

This repository includes a production-ready, fully containerized configuration to host, compile, and run the website on **Google Cloud Run** using continuous delivery on GitHub.

## Included Cloud Files:
1. **`Dockerfile`**: A multi-stage, high-performance container configuration that builds the static React/Vite assets and serves them securely.
2. **`.dockerignore`**: Excludes Node cache and development artifacts to minimize container build times.
3. **`server.js`**: A optimized, native ES modules Node + Express production server configured to dynamically serve the build on Google's specified environmental `$PORT`.
4. **`.github/workflows/google-cloudrun.yml`**: A GitHub Actions workflow that automatically handles the build, publication to Google Artifact Registry, and zero-downtime rolling updates to Cloud Run.

---

## Simple Guide to Setup GCP & GitHub Integration:

### Step 1: Create a Google Cloud Project & Service Account
1. Open up the [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project and note your **Project ID**.
3. Go to **IAM & Admin > Service Accounts** and click **Create Service Account**.
4. Give it a name (e.g., `github-actions-deployer`) and assign the following permissions:
   - **Service Account User**
   - **Cloud Run Developer**
   - **Artifact Registry Administrator**
   - **Storage Admin**
5. Click on the newly created Service Account, navigate to the **Keys** tab, select **Add Key > Create New Key**, choose **JSON**, and download the file.

### Step 2: Enable GCP Service APIs
Navigate to the API library and enable these vital services:
- **Cloud Run API** (`run.googleapis.com`)
- **Artifact Registry API** (`artifactregistry.googleapis.com`)
- **Cloud Build API** (`cloudbuild.googleapis.com`)

### Step 3: Configure GitHub Secrets
1. Go to your GitHub Repository setting pages.
2. Select **Security > Secrets and variables > Actions**.
3. Under **Repository secrets**, click **New repository secret**:
   - Title: `GCP_SA_KEY`
   - Value: Paste the *entire contents* of the JSON file you downloaded in Step 1.

### Step 4: Configure the Workflow parameters
Open `.github/workflows/google-cloudrun.yml` in this editor and customize the environment variables at the top:
```yaml
env:
  PROJECT_ID: your-real-gcp-project-id
  GCP_REGION: us-central1
  SERVICE_NAME: ernest-shimka-website
```

### Step 5: Test & Verify
Commit and push your changes to your `main` or `master` branch. The action will build the optimized container, register it, configure the firewall, and deploy your live portfolio onto Google Cloud Run seamlessly!
