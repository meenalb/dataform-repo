const scd = require("dataform-scd");


const { updates, view } = scd("customer_scd", {
 uniqueKey: "user_id",
 timestamp: "date",
 source: {
   schema: "dataform_v3",
   name: "customer_intermediate",
 },
 tags: ["scd"],
 columns: {
   user_id: docs.user_id, 
   date: "Timestamp for updates"
 },


 incrementalConfig: {
   bigquery: {
     partitionBy: "DATETIME_TRUNC(date, YEAR)",
     clusterBy: ["user_id"]
   },
 },
});


updates.config({
 description: "Updates table for SCD",
});

