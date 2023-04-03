export const getTimeString = (time:string):string => {
    
    const date = new Date(time);
    let timeString = ""
    let hours = date.getHours()
    let minutes = date.getMinutes()
    if(hours<10){
        timeString = "0"+hours+":"
    }else{
        timeString = hours+":"
    }

    if(minutes<10){
        timeString = timeString+"0"+minutes
    }else{
        timeString = timeString+minutes
    }

    return timeString

}