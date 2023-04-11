export const FORM_ENDPOINT = "http://localhost:8080/user/";
export const SERVICE_ID = "service_m92suca";
export const TEMPLATE_ID = "template_wcrd1ei";
export const PUBLIC_KEY = "CbmNbHyLjq1ERQzPU";

export const NOTIFICATION_MAP: any = {
    "SUCCESSFUL_REGISTRATION": "მომხმარებელი წარმატებით დარეგისტრირდა",
    "SUCCESSFUL_LOGIN": "წარმატებული ავტორიზაცია",
    "EMAIL_NOT_FOUND": "მომხმარებელი ამ იმეილით ვერ მოიძებნა",
    "WRONG_PASSWORD": "პაროლი არასწორია",
    "ALREADY_EXISTS": "მომხმარებელი ამ იმეილით უკვე არსებობს",
    "ILLEGAL_PASSWORD": `
         გთხოვთ გაითვალისწინოთ პაროლის მოთხოვნები:
         
         * მინიმუმ 8 სიმბოლო
         * 1 მაინც ციფრი
         * 1 მაინც პატარა ლათინური ასო
         * 1 მაინც დიდი ლათინური ასო
         * 1 მაინც სპეციალური სიმბოლო(@#$%^&+=)
         * არცერთი სფეისი
    `,
    "SUCCESSFUL_CHANGE": "პაროლი წარმატებით შეიცვალა"
};
