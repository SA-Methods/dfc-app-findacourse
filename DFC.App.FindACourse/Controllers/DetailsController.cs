using DFC.App.FindACourse.Data.Models;
using DFC.App.FindACourse.Models;
using DFC.App.FindACourse.Services;
using DFC.App.FindACourse.ViewModels;
using DFC.Compui.Cosmos.Contracts;
using DFC.Compui.Sessionstate;
using DFC.Content.Pkg.Netcore.Data.Models.ClientOptions;
using DFC.Logger.AppInsights.Contracts;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Net;
using System.Threading.Tasks;

namespace DFC.App.FindACourse.Controllers
{
    public class DetailsController : Controller
    {
        private readonly ILogService logService;
        private readonly IFindACourseService findACourseService;
        private readonly IDocumentService<StaticContentItemModel> staticContentDocumentService;
        private readonly CmsApiClientOptions cmsApiClientOptions;
        private readonly ISessionStateService<SessionDataModel> sessionStateService;

        public DetailsController(
            ILogService logService,
            IFindACourseService findACourseService,
            IDocumentService<StaticContentItemModel> staticContentDocumentService,
            CmsApiClientOptions cmsApiClientOptions,
            ISessionStateService<SessionDataModel> sessionStateService)
        {
            this.logService = logService;
            this.findACourseService = findACourseService;
            this.staticContentDocumentService = staticContentDocumentService;
            this.cmsApiClientOptions = cmsApiClientOptions;
            this.sessionStateService = sessionStateService;
        }

        [HttpGet]
        [Route("find-a-course/search/details/body")]
        [Route("find-a-course/details/body")]
        public async Task<IActionResult> Details(string courseId, string runId, string currentSearchTerm, int d, ParamValues paramValues)
        {
            logService.LogInformation($"{nameof(this.Details)} has been called");
            var model = new DetailsViewModel();
            if (paramValues.SearchTerm == null && currentSearchTerm != null)
            {
                paramValues.SearchTerm = currentSearchTerm;
            }

            model.SearchTerm = $"{nameof(paramValues.SearchTerm)}={paramValues.SearchTerm}&" +
                               $"{nameof(paramValues.Town)}={paramValues.Town}&" +
                               $"{nameof(paramValues.CourseType)}={paramValues.CourseType}&" +
                               $"{nameof(paramValues.CourseHours)}={paramValues.CourseHours}&" +
                               $"studyTime={paramValues.CourseStudyTime}&" +
                               $"{nameof(paramValues.StartDate)}={paramValues.StartDate}&" +
                               $"{nameof(paramValues.Distance)}={paramValues.Distance}&" +
                               $"{nameof(paramValues.FilterA)}={paramValues.FilterA}&" +
                               $"{nameof(paramValues.Page)}={paramValues.Page}&" +
                               $"{nameof(d)}={d}&" +
                               $"{nameof(paramValues.OrderByValue)}={paramValues.OrderByValue}";

            if (string.IsNullOrEmpty(courseId) || string.IsNullOrEmpty(runId))
            {
                throw new ArgumentNullException("Course Id and/or runId does not have a value");
            }

            await SetSessionStateAsync(paramValues).ConfigureAwait(false);

            try
            {
                model.SpeakToAnAdviser = await staticContentDocumentService.GetByIdAsync(new Guid(cmsApiClientOptions.ContentIds)).ConfigureAwait(false);
                model.CourseDetails = await findACourseService.GetCourseDetails(courseId, runId).ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                logService.LogError($"Get course details caused an error: {ex}. " +
                    $"The values passed were: course id: {courseId} and run id: {runId}");
            }

            return View(model);
        }

        private async Task<bool> SetSessionStateAsync(ParamValues paramValues)
        {
            var compositeSessionId = Request.CompositeSessionId();
            if (compositeSessionId.HasValue)
            {
                logService.LogInformation($"Getting the session state - compositeSessionId = {compositeSessionId}");

                var sessionStateModel = await sessionStateService.GetAsync(compositeSessionId.Value).ConfigureAwait(false);
                sessionStateModel.State!.ParamValues = paramValues;

                logService.LogInformation($"Saving the session state - compositeSessionId = {compositeSessionId}");

                var result = await sessionStateService.SaveAsync(sessionStateModel).ConfigureAwait(false);

                return result == HttpStatusCode.OK || result == HttpStatusCode.Created;
            }

            logService.LogError($"Error saving the session state - compositeSessionId = {compositeSessionId}");

            return false;
        }
    }
}