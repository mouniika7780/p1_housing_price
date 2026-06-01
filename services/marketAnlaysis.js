import AxiosInstance from "@/lib/axios";

export const MarketAnalysisService = {
    getMarketStats: async() =>{
        const res = await AxiosInstance.get('/stats');
        return res.data;
    },

    getFilteredStats: async(filters)=> {
        const res = await AxiosInstance.post('/stats/filtered', filters);
        return res.data;
    },

    getPriceDistribution: async() =>{
        const res = await AxiosInstance.get('/distribution');
        return res.data;
    },

    getProperties: async(page = 1, pageSize = 20, filters = {})=> {
        const res = await AxiosInstance.get('/properties', {params: {page,page_size: pageSize,...filters}});
        return res.data;
    },

    whatIfPrediction: async(payload)=> {
        const res = await AxiosInstance.post('/whatif', payload);
        return res.data;
    }

};