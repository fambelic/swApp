{{- define "ads-service.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "ads-service.namePrefix" -}}
{{- default "swapp" .Values.global.namePrefix -}}
{{- end -}}

{{- define "ads-service.appName" -}}
{{- printf "%s-%s" (include "ads-service.namePrefix" .) (default "ads" .Values.componentName) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "ads-service.fullname" -}}
{{- printf "%s-%s-%s" .Release.Name (include "ads-service.namePrefix" .) (default "ads" .Values.componentName) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "ads-service.peerFullname" -}}
{{- $root := .root -}}
{{- $component := .component -}}
{{- printf "%s-%s-%s" $root.Release.Name (default "swapp" $root.Values.global.namePrefix) $component | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "ads-service.labels" -}}
helm.sh/chart: {{ include "ads-service.chart" . }}
app.kubernetes.io/name: {{ include "ads-service.appName" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/component: {{ default "ads" .Values.componentName }}
app.kubernetes.io/part-of: {{ include "ads-service.namePrefix" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "ads-service.selectorLabels" -}}
app.kubernetes.io/name: {{ include "ads-service.appName" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}
