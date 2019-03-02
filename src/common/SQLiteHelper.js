import { SQLite } from "expo";

export const db = SQLite.openDatabase("nextmed");

export const createTables = () => {
  if (db) {
    db.transaction(tx => {
      tx.executeSql(
        "create table if not exists medications " +
          "(id integer primary key not null, " +
          "title text, " +
          "type text, " +
          "start_date text, " +
          "end_date text, " +
          "intake_times text, " +
          "recurrence text, " +
          "dosage text, " +
          "notes text, " +
          "uri text);"
      );
    });
  }
};

export const addMedication = medication => {
  if (db) {
    db.transaction(tx => {
      tx.executeSql(
        "insert into medications (title, type, start_date, end_date, intake_times, recurrence, dosage, notes, uri) values (?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          medication.title,
          medication.type,
          medication.start_date,
          medication.end_date,
          medication.intake_times.toString(),
          medication.recurrence,
          medication.dosage,
          medication.notes,
          medication.uri
        ]
      );
    }, null);
  }
};

export const updateMedication = (id, medication) => {
  if (db) {
    db.transaction(tx => {
      tx.executeSql(
        "update medications set title = ?, type = ?, start_date = ?, end_date = ?, intake_times = ?, recurrence = ?, dosage = ?, notes = ?, uri = ? where id = ?",
        [
          medication.title,
          medication.type,
          medication.start_date,
          medication.end_date,
          medication.intake_times.toString(),
          medication.recurrence,
          medication.dosage,
          medication.notes,
          medication.uri,
          id
        ]
      );
    }, null);
  }
};

export const getMedications = () => {
  return new Promise(resolve => {
    if (db) {
      db.transaction(tx => {
        tx.executeSql(`select * from medications;`, [], (_, { rows }) => {
          resolve(rows._array);
        });
      });
    }
  });
};

export const getMedicationById = id => {
  return new Promise(resolve => {
    if (db) {
      db.transaction(tx => {
        tx.executeSql(
          `select * from medications where id = ?;`,
          [id],
          (_, { rows }) => {
            resolve(rows._array[0]);
          }
        );
      });
    }
  });
};

export const deleteMedicationById = id => {
  return new Promise(resolve => {
    if (db) {
      db.transaction(tx => {
        tx.executeSql(
          `delete from medications where id = ?`,
          [id],
          (_, { rows }) => {
            resolve(rows._array);
          }
        );
      });
    }
  });
};
