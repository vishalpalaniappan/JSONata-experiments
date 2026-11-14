import jsonata from 'jsonata';
import fs from "fs/promises";
import path from "path";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


(async () => {
    const participantPath = path.join(__dirname, "narrative.json");
    const participantJSON = JSON.parse(await fs.readFile(participantPath, "utf8"));

    // Invariant expects that participant named Cart must have structural type list
    const participantName = "Cart";
    const property = "structural_type";
    const expectedProperty = "list";

    // Get the structural type of the participant
    const expression = jsonata(
        `$assert(
            narrative[participantName=${participantName}].body[name=${property}].value = ${expectedProperty},
            "Error: ${property} of ${participantName} is not ${expectedProperty}"
        )`
    );

    try{
        const result = await expression.evaluate(participantJSON);
        console.log(result)
    } catch (e) {
        console.log(e)
    }

})()