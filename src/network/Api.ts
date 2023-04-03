import { SubmitRequestSuccessModel } from "../models/SubmitRequestSuccessModel";
import { SuggestionResponse } from "../models/SuggestionResponseModel";

export const getRequest = async (
    url: string
  ): Promise<SuggestionResponse | boolean> => {
    const response = await fetch(url);
    const data = await response.json();

    if(data?.data && data?.message === "Success"){
        return data?.data as SuggestionResponse
    }else{
        return false
    }

  }

  export const submitRequest = async (
    url: string
  ): Promise<SubmitRequestSuccessModel | boolean> => {
    const response = await fetch(url);
    const data = await response.json();

    if(data?.data && data?.message === "Success"){
        return data?.data as SubmitRequestSuccessModel
    }else{
        return false
    }

  }