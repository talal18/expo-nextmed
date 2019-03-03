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
      tx.executeSql(
        "create table if not exists notifications " +
          "(id integer primary key not null, " +
          "m_id integer, " +
          "notification_id text, " +
          "date text, " +
          "status boolean, " +
          "title text, " +
          "body text);"
      );
    });
  }
};

/* Medications */
export const addMedication = medication => {
  return new Promise(resolve => {
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
          ],
          (tx, results) => {
            resolve(results.insertId);
          },
          error => console.log(error)
        );
      }, null);
    }
  });
};

export const updateMedication = (id, medication) => {
  return new Promise(resolve => {
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
          ],
          (tx, results) => {
            resolve(id);
          },
          error => console.log(error)
        );
      }, null);
    }
  });
};

export const getMedications = () => {
  return new Promise(resolve => {
    if (db) {
      db.transaction(tx => {
        tx.executeSql(
          `select * from medications;`,
          [],
          (_, { rows }) => {
            resolve(rows._array);
          },
          error => console.log(error)
        );
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
          },
          error => console.log(error)
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
          },
          error => console.log(error)
        );
      });
    }
  });
};

/* Notifications */
export const addNotification = notification => {
  if (db) {
    db.transaction(tx => {
      console.log(notification);
      tx.executeSql(
        "insert into notifications (m_id, notification_id, date, status, title, body) values (?, ?, ?, ?, ?, ?)",
        [
          notification.m_id,
          notification.notification_id,
          notification.date,
          notification.status,
          notification.title,
          notification.body
        ],
        (tx, results) => {},
        error => console.log(error)
      );
    }, null);
  }
};

export const getNotificationsByMedicationId = id => {
  return new Promise(resolve => {
    if (db) {
      db.transaction(tx => {
        tx.executeSql(
          `select * from notifications where m_id = ?;`,
          [id],
          (_, { rows }) => {
            resolve(rows._array);
          },
          error => console.log(error)
        );
      });
    }
  });
};

export const updateNotificationStatusById = (id, status) => {
  if (db) {
    db.transaction(tx => {
      tx.executeSql(
        "update notifications set status = ? where id = ?",
        [status, id],
        (tx, results) => {},
        error => console.log(error)
      );
    }, null);
  }
};

export const deleteNotificationById = id => {
  return new Promise(resolve => {
    if (db) {
      db.transaction(tx => {
        tx.executeSql(
          `delete from notifications where id = ?`,
          [id],
          (_, { rows }) => {
            resolve(rows._array);
          },
          error => console.log(error)
        );
      });
    }
  });
};

export const deleteNotificationsByMedicationId = id => {
  return new Promise(resolve => {
    if (db) {
      db.transaction(tx => {
        tx.executeSql(
          `delete from notifications where m_id = ?`,
          [id],
          (_, { rows }) => {
            resolve(rows._array);
          },
          error => console.log(error)
        );
      });
    }
  });
};
