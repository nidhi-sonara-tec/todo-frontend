import api from './Index'

const ApiUtils = {
  addTask: async function (params: any) {
    try {
      const response = await api.post('tasks', params)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  getTasksList: async function (taskTypeId: string) {
    try {
      const response = await api.get(`tasks/status/${taskTypeId}`)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  deleteTask: async function (taskTypeId: string) {
    try {
      const response = await api.delete(`tasks/${taskTypeId}`)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  editTask: async function (params: any, taskTypeId: string) {
    try {
      const response = await api.put(`tasks/${taskTypeId}`, params)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
  getTask: async function (taskTypeId: string) {
    try {
      const response = await api.get(`tasks/${taskTypeId}`)
      return response
    } catch (error: any) {
      throw error.response
    }
  },
}
export default ApiUtils