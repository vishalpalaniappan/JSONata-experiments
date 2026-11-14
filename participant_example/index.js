import jsonata from 'jsonata';
import fs from "fs/promises";
import path from "path";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


(async () => {
    const participantPath = path.join(__dirname, "participant.json");
    const participantJSON = JSON.parse(await fs.readFile(participantPath, "utf8"));

    // Get the structural type of the participant
    const expression = jsonata('body[name="structural_type"].value');
    const result = await expression.evaluate(participantJSON);

    console.log(result)
})()