# Default target
all: help

# Display help
help:
	@echo "Makefile commands:"
	@echo "  make help      - Display this help message"
	@echo "  make deploy    - Deploy to AWS Lambda serverless"


build:
	@echo "Building..."
	sam build \
		--parameter-overrides ImageTag=$(TAG)

## deploy to AWS lambda
deploy:
	@echo "Deploying to AWS Lambda..."
	aws sso login --profile $(AWS_PROFILE)
	bun run build && \
	aws s3 sync dist/ $(S3_BUCKET) --profile $(AWS_PROFILE)
	sam build \
		--parameter-overrides ImageTag=$(TAG) \
		&& \
	sam deploy \
		--parameter-overrides ApiUrl=$(API_URL) ImageTag=$(TAG)


local:
	@echo "Running locally..."
	sam local start-api