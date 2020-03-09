var FilterService = /** @class */ (function () {
    function FilterService(endPoint, type, outputId) {
        this.endPoint = endPoint;
        this.type = type;
        this.outputId = outputId;
    }
    FilterService.prototype.FilterData = function (paramFormData) {
        var formData = paramFormData;
        $.ajax({
            type: this.type,
            url: this.endPoint,
            data: formData,
            dataType: 'json',
            success: function (data) {
                $(this.outputId).empty();
                $(this.outputId).html(data);
            },
            error: function (data) {
                alert(data);
            }
        });
    };
    return FilterService;
}());
//# sourceMappingURL=FilterService.js.map