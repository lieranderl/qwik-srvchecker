# Makefile for building Docker container

# Default target
all: build

# Build the Docker container
build:
	docker build -t $(IMAGE_NAME):$(TAG) . --platform linux/amd64

# Push the Docker image to the registry
push:
	docker push $(IMAGE_NAME):$(TAG) 

# Remove the Docker image
clean:
	docker rmi $(IMAGE_NAME):$(TAG)

# Run the Docker container
run:
	docker run -it --rm $(IMAGE_NAME):$(TAG)

# Deploy to Google Cloud Run
deploy:
	gcloud run deploy $(SERVICE_NAME) --project $(PROJECT_NAME) --image $(IMAGE_NAME):$(TAG) --region $(REGION) --allow-unauthenticated


# Display help
help:
	@echo "Makefile commands:"
	@echo "  make build   - Build the Docker container"
	@echo "  make push    - Push the Docker image to the registry"
	@echo "  make clean   - Remove the Docker image"
	@echo "  make run     - Run the Docker container"
	@echo "  make help    - Display this help message"
	@echo "  make deploy  - Deploy to Google Cloud Run"


## deploy to AWS lambda
deployaws:
	@echo "Deploying to AWS Lambda..."
	bun run build && bun run deploy