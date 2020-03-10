 class FilterService {
    private endPoint: string;
    private type: string;
    private outputId: string;

    constructor(endPoint: string, type: string, outputId: string) {
        this.endPoint = endPoint;
        this.type = type;
        this.outputId = outputId;
    }

    FilterData(paramFormData: string) {
        let formData = paramFormData;

        $.ajax({
            type: this.type,
            url: this.endPoint,
            data: formData,
            success: function (data) {
                $('#course-results').empty();
                $('#course-results').html(data);
            },
            error: function (error) {
                console.log(error);
            }
        });
    }
}