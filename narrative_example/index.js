import jsonata from 'jsonata';
import fs from "fs/promises";
import path from "path";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


(async () => {
    const narrativePath = path.join(__dirname, "coffee_shop.json");
    const narrativeJSON = JSON.parse(await fs.readFile(narrativePath, "utf8"));

    // Test that every participant with structural type list also establishes the items the list can contain
    let expression = jsonata(`
        narrative.(
            $assert(
                (name = "participant" and body[name = "structural_type" and value = "list"])
                    ? $exists(body[name = "list_contains" and $exists(value)])
                    : true,
                "Participant '" & (participantName ? participantName : "unknown") & "' has structural_type 'list' but is missing 'list_contains'."
            )
        )
    `);
    
    try{
        const result = await expression.evaluate(narrativeJSON);
        console.log(result)
    } catch (e) {
        console.log(e)
    }

})()