import { onRequest as __data__subject___topic__ts_onRequest } from "C:\\Users\\dell\\Downloads\\ASTROSPACIOUS\\functions\\data\\[subject]\\[topic].ts"

export const routes = [
    {
      routePath: "/data/:subject/:topic",
      mountPath: "/data/:subject",
      method: "",
      middlewares: [],
      modules: [__data__subject___topic__ts_onRequest],
    },
  ]