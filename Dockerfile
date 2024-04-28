# Use a base image that includes k6
FROM loadimpact/k6

# Copy your k6 script into the container
COPY ./scripts /scripts

# Set default environment variables for the percentage of VUs
ENV VUS_PERCENTAGE 30

# Check the region and set the number of VUs accordingly
RUN if [ "$REGION" = "us-east-1" ]; then \
        export K6_VUS=$((100 * $VUS_PERCENTAGE / 100)); \
    elif [ "$REGION" = "us-east-2" ]; then \
        export K6_VUS=$((100 * (100 - $VUS_PERCENTAGE) / 100)); \
    fi

# Set up entrypoint to run k6 with the desired distribution
ENTRYPOINT ["k6", "run", "--vus", "${K6_VUS}", "/scripts/k6-script2.js"]
