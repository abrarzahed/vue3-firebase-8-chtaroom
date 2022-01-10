<template>
  <div class="chat-window">
    <div v-if="error">{{ error }}</div>
    <div v-if="documents" class="messages" ref="messages">
      <div v-for="doc in formattedDocuments" :key="doc.id" class="single">
        <span class="created-at">{{ doc.createdAt }}</span>
        <span class="name">{{ doc.name }}: </span>
        <span class="message">{{ doc.message }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import getCollection from "../composables/getCollection";
import { formatDistanceToNow } from "date-fns";
import { computed, ref } from "@vue/reactivity";
import { onUpdated } from "@vue/runtime-core";
export default {
  setup() {
    const { error, documents } = getCollection("messages");
    const messages = ref(null);
    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((doc) => {
          let time = formatDistanceToNow(doc.createdAt.toDate());
          return { ...doc, createdAt: time };
        });
      }
    });

    onUpdated(() => {
      messages.value.scrollTop = messages.value.scrollHeight;
    });

    return { error, documents, formattedDocuments, messages };
  },
};
</script>

<style scoped>
.chat-window {
  background: #24292b;
  padding: 30px 20px;
}
.single {
  margin: 18px 0;
  background: rgba(90, 228, 203, 0.4);
  padding: 18px 12px;
  max-width: 400px;
  border-radius: 10px;
}
.created-at {
  display: block;
  color: #ccc;
  font-size: 12px;
  margin-bottom: 4px;
}
.name {
  font-weight: 900;
  margin-right: 6px;
  color: #fff;
}
.messages {
  max-height: 400px;
  overflow: auto;
  color: #eee;
  font-size: 14px;
  letter-spacing: 0.5px;
  word-spacing: 2px;
}
</style>
