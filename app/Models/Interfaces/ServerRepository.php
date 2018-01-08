<?php

namespace App\Models\Interfaces;

/**
 * Define required operations for a valid server repository
 */
interface ServerRepository {

	/**
	 * Get the servers
	 */
	public function getServers($filter);

	/**
	 * Get the server
	 */
	public function getServer($serverId);

	/**
	 * Get the server categories
	 */
	public function getServerCategories($filter);

	/**
	 * Get the applications
	 */
	public function getApplications($server);

	/**
	 * Get applications for deployment
	 */
	public function getApplicationsForDeployment($branch, $repo);

	/**
	 * Get the notifications
	 */
	public function getNotifications($application);

	/**
	 * Get the thresholds
	 */
	public function getThresholds($server);

	/**
	 * Get the metrics
	 */
	public function getMetrics($server, $quantity);

	/**
	 * Get the deployment
	 */
	public function getDeployments($application, $initial, $quantity);

	/**
	 * Save a server
	 */
	public function saveServer(array $request);

	/**
	 * Save an application
	 */
	public function saveApplication(array $request);

	/**
	 * Save an application notification
	 */
	public function saveApplicationNotification(array $request);

	/**
	 * Save a server category
	 */
	public function saveServerCategory(array $request);

	/**
	 * Delete an application notification
	 */
	public function deleteApplicationNotification(array $request);

	/**
	 * Delete a server category
	 */
	public function deleteServerCategory(array $request);

	/**
	 * Save a threshold
	 */
	public function saveThreshold(array $request);

	/**
	 * Save a metric
	 */
	public function saveMetric(array $request);

	/**
	 * Save a deployment
	 */
	public function saveDeployment(array $request);

	/**
	 * Launch a new deployment
	 */
	public function launchDeployment(array $request);


	/**
	 * Cron to check the servers
	 */
	public function cron(array $request);

	/**
	 * Cron to communicate with the servers
	 */
	public function hookServer(array $request);

	/**
	 * Cron to delete old metrics
	 */
	public function cronDeleteMetrics(array $request);



}