import { ref, watchEffect } from "vue";
import { projectFirestore } from "../firebase/config";

const getCollection = (collection) => {
  const documents = ref(null);
  const error = ref(null);

  let collectionRef = projectFirestore
    .collection(collection)
    .orderBy("createdAt");

  const subscribe = collectionRef.onSnapshot(
    (snap) => {
      console.log("snapshot");

      let results = [];
      snap.docs.forEach((doc) => {
        doc.data().createdAt && results.push({ ...doc.data(), id: doc.id });
      });

      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = "Could not fetch data";
    }
  );

  watchEffect((onInvalidate) => {
    // unsubscribe from prev collection when watcher is stopped.
    onInvalidate(() => subscribe());
  });

  return { documents, error };
};

export default getCollection;
