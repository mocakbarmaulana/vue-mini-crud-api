<template>
    <td class="text-center py-4">{{ index }}</td>
    <td class="text-center py-4">{{ people.nama }}</td>
    <td class="text-center py-4">{{ people.nik }}</td>
    <td class="text-center py-4">{{ people.jenis_kelamin.name }}</td>
    <td class="text-center py-4">{{ people.provinsi.name }}</td>
    <td class="text-center py-4">
      <font-awesome-icon icon="eye" class="text-blue-500 hover:text-blue-700 cursor-pointer px-1" @click="$router.push({ name: 'people-show', params: { id: people.id } })" />
      <font-awesome-icon icon="pencil" class="text-blue-500 cursor-pointer px-1" @click="$router.push({ name: 'people-edit', params: { id: people.id } })" />
      <font-awesome-icon icon="trash" class="text-red-500 hover:text-red-700 font-bold cursor-pointer px-1" @click="$emit('delete', people.id)" />
    </td>
</template>

<script>
export default {
  name: 'PeopleItem',
  props: {
    people: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  emits: ['delete']
}
</script>

<style scoped>
</style>
