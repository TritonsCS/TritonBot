import moment from "moment"

const date = moment(
    "07/20/2024",
    ["MM/DD/YYYY", "DD/MM/YYYY"],
    true
)

console.log(date)

// Fail fast
if (date.toString() === "Invalid Date" || moment().unix() - date.unix() < 0) {
    console.log("Fail")

}