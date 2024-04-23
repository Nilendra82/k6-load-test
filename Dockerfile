FROM loadimpact/k6

COPY ./scripts /scripts

ENTRYPOINT ["k6", "run", "/scripts/k6-script.js"]