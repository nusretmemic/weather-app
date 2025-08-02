aws ecr get-login-password --region eu-central-1 | docker login --username AWS --password-stdin 550828606356.dkr.ecr.eu-central-1.amazonaws.com
docker build -t weather-backend .
docker tag weather-backend:latest 550828606356.dkr.ecr.eu-central-1.amazonaws.com/weather-backend:latest
docker push 550828606356.dkr.ecr.eu-central-1.amazonaws.com/weather-backend:latest