# Setup AWS CLI
[![LICENSE](https://img.shields.io/github/license/freenet-actions/setup-aws-cli)](https://github.com/freenet-actions/setup-aws-cli/blob/main/LICENSE)

This action sets up AWS CLI tool. It downloads AWS CLI binaries from https://s3.amazonaws.com/aws-cli, unpacks the downloaded file, runs the install program and adds path to PATH


Currently the action can only be used on linux plattform.
   
# Usage
## Set up default AWS CLI version (2.17.18)
```yaml
- uses: freenet-actions/setup-aws-cli@v3
```
## Set up specific AWS CLI version
```yaml
- uses: freenet-actions/setup-aws-cli@v3
  with:
    version: '2.17.18'
```

# References
[AWS CLI Install Documentation](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)