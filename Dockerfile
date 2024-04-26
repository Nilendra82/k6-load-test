FROM loadimpact/k6

COPY ./scripts /scripts

# Set environment variables for the number of VUs for each region
ENV US_EAST_1_VUS=30
ENV US_EAST_2_VUS=70

ENTRYPOINT ["k6", "run", "/scripts/k6-script.js"]