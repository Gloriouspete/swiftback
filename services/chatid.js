export default async function Getroom(id, sender) {
  return id < sender ? `${id}-${sender}` : `${sender}-${id}`;
}
