import {
  createSchema,
  definePermissions,
  type Row,
  table,
  string,
  relationships,
  boolean,
  ANYONE_CAN,
  NOBODY_CAN
} from "@rocicorp/zero";

const user = table("user")
  .columns({
    id: string(),
    name: string(),
  })
  .primaryKey("id");

const task = table("task")
  .columns({
    id: string(),
    name: string(),
    checked: boolean(),
  })
  .primaryKey("id");

//   const taskRelationships = relationships(task, ({ one }) => ({
//     createdBy: one({
//       sourceField: ["createdById"],
//       destSchema: user,
//       destField: ["id"],
//     }),
//     assignedTo: one({
//       sourceField: ["assignedToId"],
//       destSchema: user,
//       destField: ["id"],
//     }),
//   }));

export const schema = createSchema({
  // tables: [task],
  tables: [user, task],
  // relationships: [taskRelationships],
});

export type Schema = typeof schema;
//   export type User = Row<typeof schema.tables.user>;
export type Task = Row<typeof schema.tables.task>;

export const permissions = definePermissions(schema, () => {
  return {
    task: {
      row: {
        insert: ANYONE_CAN,
        update: {
          // Wrap the rule in an object with `preMutation`
          preMutation: ANYONE_CAN,
        },
        delete: ANYONE_CAN,
      },
    },
  };
});
