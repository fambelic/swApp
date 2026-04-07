{{- define "db-service.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "db-service.namePrefix" -}}
{{- default "swapp" .Values.global.namePrefix -}}
{{- end -}}

{{- define "db-service.componentAppName" -}}
{{- $root := .root -}}
{{- $component := .component -}}
{{- printf "%s-%s" (default "swapp" $root.Values.global.namePrefix) $component | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "db-service.fullname" -}}
{{- printf "%s-%s-%s" .Release.Name (include "db-service.namePrefix" .) (default "db" .Values.componentName) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "db-service.componentFullname" -}}
{{- $root := .root -}}
{{- $component := .component -}}
{{- printf "%s-%s-%s" $root.Release.Name (default "swapp" $root.Values.global.namePrefix) $component | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "db-service.headlessServiceName" -}}
{{- default (printf "%sdb" (include "db-service.namePrefix" .)) .Values.headlessService.name -}}
{{- end -}}

{{- define "db-service.labels" -}}
helm.sh/chart: {{ include "db-service.chart" . }}
app.kubernetes.io/name: {{ include "db-service.componentAppName" (dict "root" . "component" (default "db" .Values.componentName)) }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/component: {{ default "db" .Values.componentName }}
app.kubernetes.io/part-of: {{ include "db-service.namePrefix" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "db-service.selectorLabels" -}}
app.kubernetes.io/name: {{ include "db-service.componentAppName" (dict "root" . "component" (default "db" .Values.componentName)) }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}

{{- define "db-service.mongoExpressSelectorLabels" -}}
app.kubernetes.io/name: {{ include "db-service.componentAppName" (dict "root" . "component" .Values.mongoExpress.componentName) }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}
