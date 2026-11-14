import jsonata from 'jsonata';
import fs from "fs/promises";
import path from "path";

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


(async () => {
    const narrativePath = path.join(__dirname, "coffee_shop.json");
    const narrativeJSON = JSON.parse(await fs.readFile(narrativePath, "utf8"));

    // Invariant expects that participant named Cart must have structural type list
    const behaviorName = "coffee_shop";

    // Get the structural type of the participant
    const expression = jsonata(`narrative[behaviorName = '${behaviorName}']`);

    try{
        const result = await expression.evaluate(narrativeJSON);
        console.log(result)
    } catch (e) {
        console.log(e)
    }

})()