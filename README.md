# ZON Baseproject SA Action

Simple JS Action that calculates the name of a GCP Service Account in the same way the ZON `baseproject` Terraform module does it.

Useful in ZON workflows that use a CI or WI service account.


## Customization

The module logic is in `./index.js`.

## Inputs

`project` and `environment` must be supplied. `sa_type` is optional and defaults to 'ci'.

## Example Usage


```yaml
env:
  GOOGLE_PROJECT: 'zeitonline-main'
  PROJECT: 'project-with-a-long-name'
  ENVIRONMENT: 'production'

steps:

  - name: Get Baseproject SA Name
    uses: ZeitOnline/gh-action-baseproject-sa@v0
    id: baseproject
    with:
      project: ${{ env.PROJECT }}
      google_project: ${{ env.GOOGLE_PROJECT }}
      environment: ${{ env.ENVIRONMENT }}

  - name: GCloud OIDC Auth
    uses: google-github-actions/auth@v0
    with:
      workload_identity_provider: ${{ secrets.WORKLOAD_IDENTITY_PROVIDER }}
      service_account: ${{ steps.baseproject.outputs.serviceaccount }}
      token_format: 'access_token'
```
