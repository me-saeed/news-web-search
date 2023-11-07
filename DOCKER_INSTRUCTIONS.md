# Running the Dockerized "news-websearch" Project

Follow these steps to load and run the Docker image for the "news-websearch" project.

## Prerequisites

Before running the project, ensure you have Docker installed on your system.

- [Docker Installation Guide](https://www.docker.com/get-started)

## Step 1: Load the Docker Image

1. **Download the Docker Image:**

   https://drive.google.com/file/d/1qgJ8HJQafL-qqHMAXU9vOKz9jPZ8xWlp/view?usp=drive_link

2. **Load the Docker Image:**

   Run the following command to load the Docker image:

   ```shell
   docker load -i news-websearch.tar
   ```

3. **Run Docker Image:**

   Run the following command to load the Docker image:

   ```shell
   docker run -p 3000:3000 -d news-websearch:task
   ```

4. **Access application:**
   http://localhost:3000
