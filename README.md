# Setup AWS CLI

[![LICENSE](https://img.shields.io/github/license/freenet-actions/setup-aws-cli)](https://github.com/freenet-actions/setup-aws-cli/blob/main/LICENSE)

This action sets up AWS CLI tool. It downloads AWS CLI binaries from https://s3.amazonaws.com/aws-cli, unpacks the downloaded file, runs the install program and adds path to PATH

Currently the action can only be used on linux plattform.

If you're using GitHub-hosted runners in your workflow, you probably don't need this (see "Included Software" on https://github.com/actions/runner-images).
   
# Usage
## Set up AWS CLI with default version (2.34.25)
```yaml
- uses: freenet-actions/setup-aws-cli@v4.0.0
```
## Set up AWS CLI with specific version
```yaml
- uses: freenet-actions/setup-aws-cli@v4.0.0
  with:
    version: '2.34.25'
```

# References

[AWS CLI Install Documentation](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
