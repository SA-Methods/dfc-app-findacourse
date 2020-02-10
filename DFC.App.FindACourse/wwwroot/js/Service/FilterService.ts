class FilterService {
    private endPoint: string;
    private body: HTMLDivElement;

    constructor(bodyId: string, endPoint: string) {
        this.endPoint = endPoint;
        this.body = (<HTMLDivElement>document.getElementById(bodyId));
    }

    FilterData(params: string)
    {
        $.ajax({
            type: "GET",
            url: this.endPoint + "?" + params,
            success: function (data) {
                $("#course-results").empty();
                $("#course-results").html(data);
            }
        });
    }
}