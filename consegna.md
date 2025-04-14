# Esercizio

Prendiamo le API precedentemente create per il vostro blog ed aggiungiamo la persistenza tramite la connessione a un DB

## Milestone 1

Importiamo il db in allegato su MySQL Workbench
Installiamo il client mysql2 con npm i mysql2 nell’app Express
Creiamo un file di configurazione per connettere il database
Ricordiamoci di creare il file .env per impostare le credenziali di accesso al DB (aggiungere .env nel file .gitignore per evitare di pushare le credenziali)
Ricora di settare lo script nel package.json per leggere l'env node --watch --env-file=.env server.js
Per leggere le variabili del .env si usa process.env.NOME_VARIABILE_QUI
Inseriamo un console.log nella logica di connessione e proviamo ad avviare l’applicazione per verificare che non ci siano errori.

## Milestone 2

Facciamo sì che l’API di INDEX restituisca la lista di post recuperata dal database in formato JSON
Verifichiamo su Postman che la risposta sia corretta

## Milestone 3

Facciamo sì che l’API di DESTROY permetta di eliminare un post dal database
Verifichiamo su Postman che la chiamata non dia errore e risponda 204
Verifichiamo su MySQL Workbench che il post venga effettivamente rimosso

## Milestone 4

Facciamo sì che l’API di SHOW restituisca il post desiderato in formato JSON
Verifichiamo su Postman che la risposta sia corretta

### Bonus

Far sì che la SHOW restituisca il post comprensivo di tag, recuperandoli grazie alla relazione tra post e tags, esistente sul database
Buon divertimetno e confermate lettura come al solito
