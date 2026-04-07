{{- define "apigateway-service.chart" -}}
{{- printf "%s-%s" .Chart.Name .Chart.Version | replace "+" "_" | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "apigateway-service.namePrefix" -}}
{{- default "swapp" .Values.global.namePrefix -}}
{{- end -}}

{{- define "apigateway-service.appName" -}}
{{- printf "%s-%s" (include "apigateway-service.namePrefix" .) (default "gateway" .Values.componentName) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "apigateway-service.fullname" -}}
{{- printf "%s-%s-%s" .Release.Name (include "apigateway-service.namePrefix" .) (default "gateway" .Values.componentName) | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "apigateway-service.peerFullname" -}}
{{- $root := .root -}}
{{- $component := .component -}}
{{- printf "%s-%s-%s" $root.Release.Name (default "swapp" $root.Values.global.namePrefix) $component | trunc 63 | trimSuffix "-" -}}
{{- end -}}

{{- define "apigateway-service.labels" -}}
helm.sh/chart: {{ include "apigateway-service.chart" . }}
app.kubernetes.io/name: {{ include "apigateway-service.appName" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
app.kubernetes.io/component: {{ default "gateway" .Values.componentName }}
app.kubernetes.io/part-of: {{ include "apigateway-service.namePrefix" . }}
app.kubernetes.io/managed-by: {{ .Release.Service }}
{{- end -}}

{{- define "apigateway-service.selectorLabels" -}}
app.kubernetes.io/name: {{ include "apigateway-service.appName" . }}
app.kubernetes.io/instance: {{ .Release.Name }}
{{- end -}}
